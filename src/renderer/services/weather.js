import DarkSky from 'dark-sky';
import axios from 'axios';
import L from 'mapbox.js';

const owmAppId = process.env.OWM_API_KEY;
const darksky = new DarkSky(process.env.DARK_SKY_API_KEY);

/**
 * Request the weather from the weather API
 * @param {(string|float)} latitude
 * @param {(string|float)} longitude
 * @param {string} exclude - Anything that should be excluded from the API response
 * @returns {Object} - Weather API Response
 */
const fetchWeather = (latitude, longitude, exclude = '') =>
	darksky
		.latitude(latitude)
		.longitude(longitude)
		.exclude(exclude)
		.get();

/**
 * Fetch the current weather
 * @param {(string|float)} latitude
 * @param {(string|float)} longitude
 */
const fetchCurrentWeather = async (latitude, longitude) => fetchWeather(latitude, longitude, 'minutely,daily,alerts,hourly,flags');

/**
 * Fetch weather alerts
 * @param {(string|float)} latitude
 * @param {(string|float)} longitude
 */
const fetchWeatherAlerts = async (latitude, longitude) => fetchWeather(latitude, longitude, 'currently,minutely,daily,hourly,flags');

/**
 * Fetch hourly weather
 * @param {(string|float)} latitude
 * @param {(string|float)} longitude
 */
const fetchHourlyWeather = async (latitude, longitude) => fetchWeather(latitude, longitude, 'currently,minutely,alerts,daily,flags');

/**
 * Fetch daily weather
 * @param {(string|float)} latitude
 * @param {(string|float)} longitude
 */
const fetchDailyWeather = async (latitude, longitude) => fetchWeather(latitude, longitude, 'currently,minutely,alerts,hourly,flags');

/**
 * Fetch minutely weather
 * @param {(string|float)} latitude
 * @param {(string|float)} longitude
 */
const fetchMinutelyWeather = async (latitude, longitude) => fetchWeather(latitude, longitude, 'currently,daily,alerts,hourly,flags');

/**
 * Fetch city weather data based on a bounding box
 * of latitudes and longitudes
 * @param {(String|Float)} minLat
 * @param {(String|Float)} minLng
 * @param {(String|Float)} maxLat
 * @param {(String|Float)} maxLng
 */
const fetchCityData = async (minLat, minLng, maxLat, maxLng) => {
	const apiKey = process.env.OWM_API_KEY;

	return axios.get('http://api.openweathermap.org/data/2.5/box/city', {
		params: {
			cnt: 300,
			appId: apiKey,
			format: 'json',
			bbox: `${minLat},${minLng},${maxLat},${maxLng},10`,
		},
	});
};

const fetchMapLayerData = (type) => {
	const url = `http://tile.openweathermap.org/map/${type}/{z}/{x}/{y}.png?appid=${owmAppId}`;

	return L.tileLayer(url, { opacity: 0.5 });
};

export {
	fetchCurrentWeather,
	fetchWeatherAlerts,
	fetchHourlyWeather,
	fetchDailyWeather,
	fetchMinutelyWeather,
	fetchCityData,
	fetchMapLayerData,
};
