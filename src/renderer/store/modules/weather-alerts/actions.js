import moment from 'moment/moment';
import {
	SET_WEATHER_ALERTS,
	SET_WEATHER_ALERTS_LOADED,
	SET_WEATHER_ALERTS_UPDATED_AT,
} from '../../mutation-types';
import { fetchWeatherAlerts } from '../../../services/weather';

export default {
	async getWeatherAlerts({ commit }, { latitude, longitude }) {
		const { alerts } = await fetchWeatherAlerts(latitude, longitude);

		commit(SET_WEATHER_ALERTS, alerts);
		commit(SET_WEATHER_ALERTS_LOADED, true);
		commit(SET_WEATHER_ALERTS_UPDATED_AT, +moment());
	},
};
