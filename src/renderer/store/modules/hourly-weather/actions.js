import moment from 'moment/moment';
import { fetchHourlyWeather } from '../../../services/weather';
import {
	SET_HOURLY_WEATHER,
	SET_HOURLY_WEATHER_LOADED,
	SET_HOURLY_WEATHER_UPDATED_AT,
} from '../../mutation-types';

export default {
	async getHourlyWeather({ commit }, { latitude, longitude }) {
		const { hourly } = await fetchHourlyWeather(latitude, longitude);

		commit(SET_HOURLY_WEATHER, hourly);
		commit(SET_HOURLY_WEATHER_LOADED, true);
		commit(SET_HOURLY_WEATHER_UPDATED_AT, +moment());
	},
};
