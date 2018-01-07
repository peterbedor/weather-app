<template>
	<card class="map-card">
		<div :class="['map-container', { fullscreen, sidebarOpen }]">
			<div id="map" ref="map" class="map"></div>
			<div class="map-fullscreen">
				<icon type="fullscreen" size="large" @click="toggleFullscreen" />
			</div>
		</div>
		<perfect-scroll class="map-controls">
			<ul class="control-list">
				<li
					v-for="(layer, i) in layers"
					:key="i"
					:class="['control-list-item', { inactive: !layer.active }]"
				>
					<div class="control-list-name" @click="toggleLayer(layer)">
						{{ layer.display }}
					</div>
					<div class="control-list-opacity" v-if="layer.active">
						<vue-slider
							:value="layer.opacity"
							v-model="layer.opacity"
							:min="0"
							:max="1"
							:interval=".1"
							tooltip="hover"
							@input="changeOpacity(layer)"
						/>
					</div>
				</li>
			</ul>
		</perfect-scroll>
	</card>
</template>

<script>
	import { mapGetters } from 'vuex';
	import L from 'mapbox.js';
	import VueSlider from 'vue-slider-component';
	import PerfectScroll from 'vue-perfect-scrollbar';
	import Icon from '../utilities/Icon';
	import '../../plugins/leaflet-owm';
	import Card from '../utilities/Card';

	export default {
		name: 'weather-map',
		components: { Card, VueSlider, PerfectScroll, Icon },

		mounted() {
			const { latitude, longitude } = this.defaultLocation.coordinates;

			L.mapbox.accessToken = process.env.MAPBOX_API_KEY;
			this.mapObject = L.mapbox.map(this.$refs.map, 'mapbox.outdoors', { attributionControl: false })
				.setView([latitude, longitude], 13);

			this.owmAppId = process.env.OWM_API_KEY;
		},

		watch: {
			defaultLocation() {
				const { latitude, longitude } = this.defaultLocation.coordinates;

				this.mapObject.flyTo([latitude, longitude], 13);
			},
		},

		methods: {
			toggleFullscreen() {
				this.fullscreen = !this.fullscreen;

				this.$nextTick(() => {
					this.mapObject.invalidateSize();
				});
			},

			changeOpacity(layer) {
				layer.data.setOpacity(layer.opacity);
			},

			toggleLayer(layer) {
				const map = this.mapObject;

				if (!layer.active) {
					layer.data = L.tileLayer(this.buildUrl(layer.name), { opacity: 0.5 })
						.addTo(map);
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
		},

		data: () => ({
			appId: null,
			mapObject: {},
			fullscreen: false,
			layers: {
				clouds: {
					display: 'clouds',
					name: 'clouds_new',
					data: null,
					active: false,
					opacity: 0,
				},
				snow: {
					display: 'snow',
					name: 'snow',
					data: null,
					active: false,
					opacity: 0,
				},
				precipitation: {
					display: 'precipitation',
					name: 'precipitation_new',
					data: null,
					active: false,
					opacity: 0,
				},
				precipitationClassic: {
					display: 'precipitation (classic)',
					name: 'precipitation_cls',
					data: null,
					active: false,
					opacity: 0,
				},
				pressure: {
					display: 'pressure',
					name: 'pressure_new',
					data: null,
					active: false,
					opacity: 0,
				},
				pressureCountour: {
					display: 'pressure contour',
					name: 'pressure_cntr',
					data: null,
					active: false,
					opacity: 0,
				},
				wind: {
					display: 'wind speed',
					name: 'wind_new',
					data: null,
					active: false,
					opacity: 0,
				},
				rain: {
					display: 'rain',
					name: 'rain',
					data: null,
					active: false,
					opacity: 0,
				},
				rainClassic: {
					display: 'rain (classic)',
					name: 'rain_cls',
					data: null,
					active: false,
					opacity: 0,
				},
				temperature: {
					display: 'temperature',
					name: 'temp_new',
					data: null,
					active: false,
					opacity: 0,
				},
			},
		}),
	};
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/_variables";

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
		}
		&.sidebarOpen {
			left: 20rem;
		}
	}
	.map {
		height: 100%;
		width: 100%;
	}
	.map-controls {
		background-color: $lightestGray;
		width: 20%;
		margin-left: 2rem;
		min-width: 20.8rem;
		overflow: scroll;
	}
	.control-list {
		list-style-type: none;
		margin: 0;
		padding: 2rem;
	}
	.control-list-item {
		font-size: 1.4rem;
		font-weight: 600;
		cursor: pointer;
		&.inactive {
			opacity: 0.5;
		}
	}
	.map-fullscreen {
		z-index: 1000;
		position: absolute;
		top: 1rem;
		right: 1rem;
		color: $trueWhite;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
	}
</style>
