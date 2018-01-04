import moment from 'moment/moment';
import suncalc from '../../../services/suncalc';
import {
	SET_SUN_POSITION,
	SET_SUN_POSITION_LOADED,
	SET_SUN_POSITION_UPDATED_AT,
} from '../../mutation-types';

export default {
	calculateSunPosition({ commit }, { latitude, longitude }) {
		const times = suncalc(latitude, longitude);

		commit(SET_SUN_POSITION, times);
		commit(SET_SUN_POSITION_LOADED, true);
		commit(SET_SUN_POSITION_UPDATED_AT, +moment());
	},
};
