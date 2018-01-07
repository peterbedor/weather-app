import {
	SET_LOADING,
	SET_LOADING_MESSAGE,
	SET_SIDEBAR_OPEN,
} from '../../mutation-types';

export default {
	setLoading({ commit }, message = '') {
		commit(SET_LOADING, true);
		commit(SET_LOADING_MESSAGE, message);
	},

	unsetLoading({ commit }) {
		commit(SET_LOADING, false);
		commit(SET_LOADING_MESSAGE, '');
	},

	openSidebar({ commit }) {
		commit(SET_SIDEBAR_OPEN, true);
	},

	closeSidebar({ commit }) {
		commit(SET_SIDEBAR_OPEN, false);
	},
};
