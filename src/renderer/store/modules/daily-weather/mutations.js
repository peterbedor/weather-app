import lockr from 'lockr';
import {
	SET_DAILY_WEATHER,
	SET_DAILY_WEATHER_LOADED,
	SET_DAILY_WEATHER_UPDATED_AT,
} from '../../mutation-types';

export default {
	[SET_DAILY_WEATHER](state, { data, icon, summary }) {
		state.summary = summary;
		state.data = data;
		state.icon = icon;

		lockr.set('dailyWeather', state);
	},

	[SET_DAILY_WEATHER_LOADED](state, payload) {
		state.loaded = payload;

		lockr.set('dailyWeather', state);
	},

	[SET_DAILY_WEATHER_UPDATED_AT](state, payload) {
		state.updatedAt = payload;

		lockr.set('dailyWeather', state);
	},

};
