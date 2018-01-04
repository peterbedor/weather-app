import { SET_LOADING, SET_LOADING_MESSAGE } from '../../mutation-types';

export default {
	setLoading({ commit }, message = '') {
		commit(SET_LOADING, true);
		commit(SET_LOADING_MESSAGE, message);
	},

	unsetLoading({ commit }) {
		commit(SET_LOADING, false);
		commit(SET_LOADING_MESSAGE, '');
	},
};
