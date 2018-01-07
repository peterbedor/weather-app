import each from 'lodash/each';
import lockr from 'lockr';
import Vue from 'vue';
import {
	ADD_DEFAULT_LOCATION,
	SET_LOCATIONS_LOADED,
	ADD_LOCATION,
	REMOVE_LOCATION,
	SET_DEFAULT_LOCATION,
} from '../../mutation-types';

export default {
	[ADD_DEFAULT_LOCATION](state, payload) {
		each(state.data, (o) => {
			o.default = false;
		});

		state.data.push({ ...payload, default: true });

		lockr.set('locations', state);
	},

	[SET_LOCATIONS_LOADED](state, payload) {
		state.loaded = payload;

		lockr.set('locations', state);
	},

	[ADD_LOCATION](state, payload) {
		state.data.push({ ...payload, default: false });

		lockr.set('locations', state);
	},

	[REMOVE_LOCATION](state, payload) {
		const index = state.data.indexOf(payload);

		state.data.splice(index, 1);

		lockr.set('locations', state);
	},

	[SET_DEFAULT_LOCATION](state, payload) {
		each(state.data, (o) => {
			o.default = false;
		});

		const index = state.data.indexOf(payload);

		Vue.set(state.data, index, { ...payload, default: true });

		lockr.set('locations', state);
	},
};
