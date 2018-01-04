import lockr from 'lockr';
import {
	SET_SUN_POSITION,
	SET_SUN_POSITION_LOADED,
	SET_SUN_POSITION_UPDATED_AT,
} from '../../mutation-types';

export default {
	[SET_SUN_POSITION](state, payload) {
		state.data = payload;

		lockr.set('sunPosition', state);
	},

	[SET_SUN_POSITION_LOADED](state, payload) {
		state.loaded = payload;

		lockr.set('sunPosition', state);
	},

	[SET_SUN_POSITION_UPDATED_AT](state, payload) {
		state.updatedAt = payload;

		lockr.set('sunPosition', state);
	},
};
