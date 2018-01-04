import Vue from 'vue';
import { SET_LOADING, SET_LOADING_MESSAGE } from '../../mutation-types';

export default {
	[SET_LOADING](state, payload) {
		Vue.set(state, 'loading', payload);
	},

	[SET_LOADING_MESSAGE](state, payload) {
		Vue.set(state, 'loadingMessage', payload);
	},
};
