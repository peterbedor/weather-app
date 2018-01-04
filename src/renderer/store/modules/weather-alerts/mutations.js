import lockr from 'lockr';
import {
	SET_WEATHER_ALERTS,
	SET_WEATHER_ALERTS_LOADED,
	SET_WEATHER_ALERTS_UPDATED_AT,
} from '../../mutation-types';

export default {
	[SET_WEATHER_ALERTS](state, payload) {
		state.data = payload;

		lockr.set('weatherAlerts', state);
	},

	[SET_WEATHER_ALERTS_LOADED](state, payload) {
		state.loaded = payload;

		lockr.set('weatherAlerts', state);
	},

	[SET_WEATHER_ALERTS_UPDATED_AT](state, payload) {
		state.updatedAt = payload;

		lockr.set('weatherAlerts', state);
	},
};
