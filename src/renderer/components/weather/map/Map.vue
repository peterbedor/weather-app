<template>
	<card class="map-card">
		<div :class="['map-container', { fullscreen, sidebar: fullscreen && sidebarOpen }]">
			<div id="map" ref="map" class="map"></div>
			<div class="map-fullscreen">
				<icon :type="fullscreen ? 'fullscreen_exit' : 'fullscreen'" size="large" @click="toggleFullscreen" />
			</div>
		</div>
		<map-controls
			:layers="layers"
			@layerToggled="toggleLayer"
			@layerOpacityChange="handleOpacityChange"
		/>
	</card>
</template>

<script>
	/* eslint-disable */
	import { mapGetters, mapActions } from 'vuex';
	import fs from 'fs';
	import unzip from 'unzip2';
	import parser from 'xml2js';
	import L from 'mapbox.js';
	import { fetchCityData, fetchMapLayerData } from '../../../services/weather'; // eslint-disable-line
	import Icon from '../../utilities/Icon';
	import Card from '../../utilities/Card';
	import MapControls from './Controls';

	export default {
		name: 'weather-map',
		components: { Card, Icon, MapControls },

		mounted() {
			const { latitude, longitude } = this.defaultLocation.coordinates;

			L.mapbox.accessToken = process.env.MAPBOX_API_KEY;

			this.mapObject = L.mapbox.map(
				this.$refs.map,
				this.selectedMapStyle,
				{ attributionControl: false },
			).setView([latitude, longitude], 13);

			fs.createReadStream(`${__static}/test.kmz`)
				.pipe(unzip.Parse())
				.on('entry', (entry) => {
					let data = '';

					entry.on('data', (chunk) => {
						data += chunk;
					});

					entry.on('end', () => {
						console.log(data);
						parser.parseString(data, (err, result) => {
							const overlay = result.kml.Document[0].Folder[1].Folder[0].GroundOverlay[0];
							const url = overlay.Icon[0].href[0];
							const latLng = [
								overlay.LatLonBox[0].north[0],
								overlay.LatLonBox[0].east[0],
								overlay.LatLonBox[0].south[0],
								overlay.LatLonBox[0].west[0],
							];

							console.log(url, latLng);
							L.imageOverlay(url, [[latLng[0], latLng[1]], [latLng[2], latLng[3]]])
								.addTo(this.mapObject);
						});
					});
				});

			// omnivore.kml('static/test.kml').addTo(this.mapObject);
		},

		watch: {
			defaultLocation() {
				const { latitude, longitude } = this.defaultLocation.coordinates;

				this.mapObject.flyTo([latitude, longitude], 13);
			},
		},

		methods: {
			...mapActions('weatherMap', {
				enableFullscreen: 'enableFullscreen',
				disableFullscreen: 'disableFullscreen',
			}),

			getcity() {
				const bb = this.mapObject.getBounds();

				fetchCityData(bb.getWest(), bb.getSouth(), bb.getEast(), bb.getNorth())
					.then(({ data }) => {
						console.log(data);
					});
			},

			toggleFullscreen() {
				if (this.fullscreen) {
					this.disableFullscreen();
				} else {
					this.enableFullscreen();
				}

				this.$nextTick(() => {
					this.mapObject.invalidateSize();
				});
			},

			handleOpacityChange(layer, opacity) {
				layer.data.setOpacity(opacity);
			},

			toggleLayer(layer) {
				const map = this.mapObject;

				if (!layer.active) {
					layer.data = fetchMapLayerData(layer.name).addTo(map);
					layer.active = true;
					layer.opacity = 0.5;
				} else {
					map.removeLayer(layer.data);
					layer.active = false;
					layer.opacity = 0;
				}
			},

			addLayer(type, opacity) {
				const layerType = this.layers[type];

				layerType.data = L.tileLayer(this.buildUrl(layerType.name), { opacity })
					.addTo(this.mapObject);
			},

			buildUrl(type) {
				return `http://tile.openweathermap.org/map/${type}/{z}/{x}/{y}.png?appid=${this.owmAppId}`;
			},
		},

		computed: {
			...mapGetters('locations', {
				defaultLocation: 'defaultLocation',
			}),

			...mapGetters('app', {
				sidebarOpen: 'sidebarOpen',
			}),

			...mapGetters('weatherMap', {
				fullscreen: 'fullscreen',
				enabledLayers: 'enabledLayers',
				selectedMapStyle: 'selectedMapStyle',
			}),
		},

		data: () => ({
			mapObject: {},
			layers: {
				clouds: {
					display: 'clouds',
					name: 'clouds_new',
					data: null,
					cache: null,
					updatedAt: null,
					active: false,
					enabled: true,
					opacity: 0,
				},
				snow: {
					display: 'snow',
					name: 'snow',
					data: null,
					cache: null,
					active: false,
					updatedAt: null,
					enabled: true,
					opacity: 0,
				},
				precipitation: {
					display: 'precipitation',
					name: 'precipitation_new',
					data: null,
					cache: null,
					active: false,
					updatedAt: null,
					enabled: true,
					opacity: 0,
				},
				precipitationClassic: {
					display: 'precipitation (classic)',
					name: 'precipitation_cls',
					data: null,
					cache: null,
					active: false,
					updatedAt: null,
					enabled: true,
					opacity: 0,
				},
				pressure: {
					display: 'pressure',
					name: 'pressure_new',
					data: null,
					cache: null,
					active: false,
					updatedAt: null,
					enabled: true,
					opacity: 0,
				},
				pressureCountour: {
					display: 'pressure contour',
					name: 'pressure_cntr',
					data: null,
					cache: null,
					active: false,
					updatedAt: null,
					enabled: true,
					opacity: 0,
				},
				wind: {
					display: 'wind speed',
					name: 'wind_new',
					data: null,
					cache: null,
					active: false,
					updatedAt: null,
					enabled: true,
					opacity: 0,
				},
				windClassic: {
					display: 'wind speed (classic)',
					name: 'wind',
					data: null,
					cache: null,
					active: false,
					updatedAt: null,
					enabled: true,
					opacity: 0,
				},
				rain: {
					display: 'rain',
					name: 'rain',
					data: null,
					cache: null,
					active: false,
					updatedAt: null,
					enabled: true,
					opacity: 0,
				},
				rainClassic: {
					display: 'rain (classic)',
					name: 'rain_cls',
					data: null,
					cache: null,
					active: false,
					enabled: true,
					updatedAt: null,
					opacity: 0,
				},
				temperature: {
					display: 'temperature',
					name: 'temp_new',
					data: null,
					cache: null,
					active: false,
					updatedAt: null,
					enabled: true,
					opacity: 0,
				},
				temperatureClassic: {
					display: 'temperature (classic)',
					name: 'temp',
					data: null,
					cache: null,
					active: false,
					updatedAt: null,
					enabled: true,
					opacity: 0,
				},
			},
		}),
	};
</script>

<style lang="scss" scoped>
	@import "../../../assets/scss/_variables";

	.map-card {
		width: 100%;
		height: 50%;
		padding: 2rem;
		display: flex;
	}
	.map-container {
		position: relative;
		height: 100%;
		width: 80%;
		background-color: $trueWhite;
		&.fullscreen {
			position: fixed !important;
			width: 100%;
			height: 100%;
			top: 6rem;
			left: 6rem;
			right: 0;
			bottom: 0;
			z-index: 9999;
			transition: left .2s ease-in-out;
			.map-fullscreen {
				right: 7rem;
			}
		}
		&.sidebar {
			left: 20rem;
		}
	}
	.map {
		height: 100%;
		width: 100%;
	}

	.map-fullscreen {
		z-index: 100;
		position: absolute;
		top: 1rem;
		right: 1rem;
		color: $trueWhite;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
	}
</style>
