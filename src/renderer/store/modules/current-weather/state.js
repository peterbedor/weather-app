import lockr from 'lockr';

window.lockr = lockr;

export default lockr.get('currentWeather') || {
	loaded: false,
	dirty: false,
	updatedAt: null,
	data: {
		apparentTemperature: null,
		cloudCover: null,
		dewPoint: null,
		humidity: null,
		icon: null,
		nearestStormBearing: null,
		nearestStormDistance: null,
		ozone: null,
		precipIntensity: null,
		precipProbability: null,
		pressure: null,
		summary: null,
		temperature: null,
		time: null,
		uvIndex: null,
		visibility: null,
		windBearing: null,
		windGust: null,
		windSpeed: null,
	},
};
