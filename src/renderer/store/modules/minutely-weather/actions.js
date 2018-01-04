import moment from 'moment/moment';
import { fetchMinutelyWeather } from '../../../services/weather';
import {
	SET_MINUTELY_WEATHER,
	SET_MINUTELY_WEATHER_LOADED,
	SET_MINUTELY_WEATHER_UPDATED_AT,
} from '../../mutation-types';

export default {
	async getMinutelyWeather({ commit }, { latitude, longitude }) {
		const { minutely } = await fetchMinutelyWeather(latitude, longitude);

		commit(SET_MINUTELY_WEATHER, minutely);
		commit(SET_MINUTELY_WEATHER_LOADED, true);
		commit(SET_MINUTELY_WEATHER_UPDATED_AT, +moment());
	},
};
