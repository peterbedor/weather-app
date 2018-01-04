import lockr from 'lockr';
import {
	SET_CURRENT_WEATHER,
	SET_CURRENT_WEATHER_LOADED,
	SET_CURRENT_WEATHER_UPDATED_AT,
} from '../../mutation-types';

export default {
	[SET_CURRENT_WEATHER](state, payload) {
		state.data = payload;

		lockr.set('currentWeather', state);
	},

	[SET_CURRENT_WEATHER_LOADED](state, payload) {
		state.loaded = payload;

		lockr.set('currentWeather', state);
	},

	[SET_CURRENT_WEATHER_UPDATED_AT](state, payload) {
		state.updatedAt = payload;

		lockr.set('currentWeather', state);
	},
};
