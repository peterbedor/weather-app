import lockr from 'lockr';
import {
	SET_MINUTELY_WEATHER,
	SET_MINUTELY_WEATHER_LOADED,
	SET_MINUTELY_WEATHER_UPDATED_AT,
} from '../../mutation-types';

export default {
	[SET_MINUTELY_WEATHER](state, { data, icon, summary }) {
		state.data = data;
		state.icon = icon;
		state.summary = summary;

		lockr.set('minutelyWeather', state);
	},

	[SET_MINUTELY_WEATHER_LOADED](state, payload) {
		state.loaded = payload;

		lockr.set('minutelyWeather', state);
	},

	[SET_MINUTELY_WEATHER_UPDATED_AT](state, payload) {
		state.updatedAt = payload;

		lockr.set('minutelyWeather', state);
	},

};
