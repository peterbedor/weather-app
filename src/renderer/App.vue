<template>
	<div id="app">
		<transition>
			<router-view></router-view>
		</transition>
		<app-loader v-if="loading" />
		<notifications group="feedback" />
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import isEmpty from 'lodash/isEmpty';
	import { getCurrentLocation } from './services/locations';
	import AppLoader from './components/utilities/AppLoader';

	export default {
		name: 'dads-weather',
		components: { AppLoader },
		mounted() {
			if (!this.allLoaded) {
				this.setLoading('Gathering your location and weather information, please wait.');
			}

			// Check if we have any saved locations, if not get the user's
			// current location and proceed
			if (isEmpty(this.locations)) {
				getCurrentLocation()
					.then(({ coords: { latitude, longitude } }) => {
						Promise.all([
							this.addDefaultLocationFromCoords({ latitude, longitude }),
							this.calculateSunPosition({ latitude, longitude }),
							this.getCurrentWeather({ latitude, longitude }),
							this.getWeatherAlerts({ latitude, longitude }),
							this.getHourlyWeather({ latitude, longitude }),
							this.getDailyWeather({ latitude, longitude }),
							this.getMinutelyWeather({ latitude, longitude }),
						]).then(() => this.unsetLoading());
					});
			} else {
				if (!this.sunPositionLoaded) {
					const { latitude, longitude } = this.defaultLocation.coordinates;

					this.calculateSunPosition({ latitude, longitude })
						.then(() => this.unsetLoading());
				}

				if (!this.currentWeatherLoaded) {
					const { latitude, longitude } = this.defaultLocation.coordinates;

					this.getCurrentWeather({ latitude, longitude })
						.then(() => this.unsetLoading());
				}

				if (!this.weatherAlertsLoaded) {
					const { latitude, longitude } = this.defaultLocation.coordinates;

					this.getWeatherAlerts({ latitude, longitude })
						.then(() => this.unsetLoading());
				}

				if (!this.hourlyWeatherLoaded) {
					const { latitude, longitude } = this.defaultLocation.coordinates;

					this.getHourlyWeather({ latitude, longitude })
						.then(() => this.unsetLoading());
				}

				if (!this.dailyWeatherLoaded) {
					const { latitude, longitude } = this.defaultLocation.coordinates;

					this.getDailyWeather({ latitude, longitude })
						.then(() => this.unsetLoading());
				}

				if (!this.minutelyWeatherLoaded) {
					const { latitude, longitude } = this.defaultLocation.coordinates;

					this.getMinutelyWeather({ latitude, longitude })
						.then(() => this.unsetLoading());
				}
			}
		},

		methods: {
			...mapActions('locations', {
				addDefaultLocationFromCoords: 'addDefaultLocationFromCoords',
			}),

			...mapActions('app', {
				setLoading: 'setLoading',
				unsetLoading: 'unsetLoading',
			}),

			...mapActions('sunPosition', {
				calculateSunPosition: 'calculateSunPosition',
			}),

			...mapActions('currentWeather', {
				getCurrentWeather: 'getCurrentWeather',
			}),

			...mapActions('weatherAlerts', {
				getWeatherAlerts: 'getWeatherAlerts',
			}),

			...mapActions('hourlyWeather', {
				getHourlyWeather: 'getHourlyWeather',
			}),

			...mapActions('dailyWeather', {
				getDailyWeather: 'getDailyWeather',
			}),

			...mapActions('minutelyWeather', {
				getMinutelyWeather: 'getMinutelyWeather',
			}),
		},

		computed: {
			...mapGetters('locations', {
				locations: 'locations',
				defaultLocation: 'defaultLocation',
				locationsLoaded: 'loaded',
			}),

			...mapGetters('app', {
				loading: 'loading',
			}),

			...mapGetters('sunPosition', {
				sunPositionLoaded: 'loaded',
			}),

			...mapGetters('currentWeather', {
				currentWeatherLoaded: 'loaded',
			}),

			...mapGetters('weatherAlerts', {
				weatherAlertsLoaded: 'loaded',
			}),

			...mapGetters('hourlyWeather', {
				hourlyWeatherLoaded: 'loaded',
			}),

			...mapGetters('dailyWeather', {
				dailyWeatherLoaded: 'loaded',
			}),

			...mapGetters('minutelyWeather', {
				minutelyWeatherLoaded: 'loaded',
			}),

			allLoaded() {
				return !isEmpty(this.locations) &&
					this.currentWeatherLoaded &&
					this.weatherAlertsLoaded &&
					this.sunPositionLoaded &&
					this.hourlyWeatherLoaded &&
					this.dailyWeatherLoaded &&
					this.minutelyWeatherLoaded;
			},
		},
	};
</script>

<style lang="scss">
	@import "../renderer/assets/scss/_variables";

	$baseFont: 'Open Sans', Helvetica, Arial, sans-serif;
	$headingFont: $baseFont;

	@import "../renderer/assets/scss/_mixins";
	@import "../renderer/assets/scss/_reset";
	@import "../renderer/assets/scss/helpers";
	@import "../renderer/assets/scss/modules/button";
	@import "../renderer/assets/scss/modules/form";
	@import "../renderer/assets/scss/_transitions";

	html,
	body {
		width: 100vw;
		height: 100vh;
	}
	#app,
	.page {
		height: calc(100vh - 6rem);
	}
	body {
		background-color: $white;
	}
	.full {
		height: 100%;
	}
</style>
