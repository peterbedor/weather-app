import isEmpty from 'lodash/isEmpty';
import { fetchLocationByLatLng } from '../../../services/locations';
import {
	ADD_DEFAULT_LOCATION,
	SET_LOCATIONS_LOADED,
	ADD_LOCATION,
	REMOVE_LOCATION,
	SET_DEFAULT_LOCATION,
} from '../../mutation-types';

export default {
	/**
	 * Add a location to the store and set as default
	 * @async
	 * @param {Function} $0.commit
	 * @param {String} $0.latitude
	 * @param {String} $0.longitude
	 */
	async addDefaultLocationFromCoords({ commit }, { latitude, longitude }) {
		const payload = await fetchLocationByLatLng(latitude, longitude);

		commit(ADD_DEFAULT_LOCATION, payload);
		commit(SET_LOCATIONS_LOADED, true);
	},

	/**
	 * Add a location to the store
	 * @async
	 * @param {Function} $0.commit
	 * @param {String} $0.latitude
	 * @param {String} $0.longitude
	 */
	async addLocationFromCoords({ commit }, { latitude, longitude }) {
		const payload = await fetchLocationByLatLng(latitude, longitude);

		commit(ADD_LOCATION, payload);
	},

	/**
	 * remove a location from the store
	 * @async
	 * @param {Function} $0.commit
	 * @param {Number} location - The location to be removed
	 */
	removeLocation({ commit }, location) {
		return new Promise((resolve, error) => {
			if (!isEmpty(location)) {
				commit(REMOVE_LOCATION, location);
				resolve();
			}

			error();
		});
	},

	setDefaultLocation({ commit }, location) {
		commit(SET_DEFAULT_LOCATION, location);
	},
};
