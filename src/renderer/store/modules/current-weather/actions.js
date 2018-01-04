import moment from 'moment/moment';
import { fetchCurrentWeather } from '../../../services/weather';
import {
	SET_CURRENT_WEATHER,
	SET_CURRENT_WEATHER_LOADED,
	SET_CURRENT_WEATHER_UPDATED_AT,
} from '../../mutation-types';

export default {
	async getCurrentWeather({ commit }, { latitude, longitude }) {
		const { currently } = await fetchCurrentWeather(latitude, longitude);

		commit(SET_CURRENT_WEATHER, currently);
		commit(SET_CURRENT_WEATHER_LOADED, true);
		commit(SET_CURRENT_WEATHER_UPDATED_AT, +moment());
	},
};
