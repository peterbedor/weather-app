import DarkSky from 'dark-sky';

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

export {
	fetchCurrentWeather,
	fetchWeatherAlerts,
	fetchHourlyWeather,
	fetchDailyWeather,
	fetchMinutelyWeather,
};
