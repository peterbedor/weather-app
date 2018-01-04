import lockr from 'lockr';
import {
	SET_HOURLY_WEATHER,
	SET_HOURLY_WEATHER_LOADED,
	SET_HOURLY_WEATHER_UPDATED_AT,
} from '../../mutation-types';

export default {
	[SET_HOURLY_WEATHER](state, { data, icon, summary }) {
		state.data = data;
		state.icon = icon;
		state.summary = summary;

		lockr.set('hourlyWeather', state);
	},

	[SET_HOURLY_WEATHER_LOADED](state, payload) {
		state.loaded = payload;

		lockr.set('hourlyWeather', state);
	},

	[SET_HOURLY_WEATHER_UPDATED_AT](state, payload) {
		state.updatedAt = payload;

		lockr.set('hourlyWeather', state);
	},

};
