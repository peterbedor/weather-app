import axios from 'axios';
import first from 'lodash/first';
import flow from 'lodash/flow';

const locationRequest = axios.create({
	baseURL: 'https://api.geocod.io/v1/',
});

// Intercept locationRequest requests and append the
// required Google API key parameter to each request config
locationRequest.interceptors.request.use((config) => {
	config.params.api_key = '138da53884d354ad3848ed5888edad8deae7337';

	return config;
});

/**
 * Transform Geocod.io api response item
 * @param {object} data - geocodio api response item
 */
const transform = data => ({
	city: data.address_components.city,
	state: data.address_components.state,
	county: data.address_components.county,
	address: data.formatted_address,
	zip: data.address_components.zip,
	coordinates: {
		latitude: data.location.lat,
		longitude: data.location.lng,
	},
});

/**
 * Fetch a location by latitude and longitude
 * @async
 * @param {(string|float)} lat - The latitude
 * @param {(string|float)} lng - The longitude
 * @returns {Promise}
 */
const fetchLocationByLatLng = async (lat, lng) => {
	const { data: { results } } = await locationRequest.get('reverse', { params: { q: `${lat},${lng}` } });

	return flow(first, transform)(results);
};

/**
 * Fetch the current user location using the HTML geolocation API
 * @async
 * @param {object} [options] - The options object for the getCurrentPosition function
 * @returns {Promise}
 */
const getCurrentLocation = (options = {}) => new Promise((resolve, reject) => {
	navigator.geolocation.getCurrentPosition(resolve, reject, options);
});

/**
 * Search the google geolocation service API by address string
 * @async
 * @param {string} address - The address to query
 * @returns {Promise}
 */
const searchByAddress = q => locationRequest.get('geocode', { params: { q } });

export { searchByAddress, fetchLocationByLatLng, getCurrentLocation };
