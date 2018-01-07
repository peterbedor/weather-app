import Vue from 'vue';
import {
	SET_LOADING,
	SET_LOADING_MESSAGE,
	SET_SIDEBAR_OPEN,
} from '../../mutation-types';

export default {
	[SET_LOADING](state, payload) {
		Vue.set(state, 'loading', payload);
	},

	[SET_LOADING_MESSAGE](state, payload) {
		Vue.set(state, 'loadingMessage', payload);
	},

	[SET_SIDEBAR_OPEN](state, payload) {
		Vue.set(state, 'sidebarOpen', payload);
	},
};
