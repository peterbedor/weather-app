import moment from 'moment/moment';
import { fetchDailyWeather } from '../../../services/weather';
import {
	SET_DAILY_WEATHER,
	SET_DAILY_WEATHER_LOADED,
	SET_DAILY_WEATHER_UPDATED_AT,
} from '../../mutation-types';

export default {
	async getDailyWeather({ commit }, { latitude, longitude }) {
		const { daily } = await fetchDailyWeather(latitude, longitude);


		commit(SET_DAILY_WEATHER, daily);
		commit(SET_DAILY_WEATHER_LOADED, true);
		commit(SET_DAILY_WEATHER_UPDATED_AT, +moment());
	},
};
