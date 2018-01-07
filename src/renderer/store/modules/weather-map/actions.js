import {
	ENABLE_FULLSCREEN_MAP,
	DISABLE_FULLSCREEN_MAP,
	SET_MAPSTYLE_SETTING,
} from '../../mutation-types';

export default {
	enableFullscreen({ commit }) {
		commit(ENABLE_FULLSCREEN_MAP);
	},

	disableFullscreen({ commit }) {
		commit(DISABLE_FULLSCREEN_MAP);
	},

	setMapStyle({ commit }, payload) {
		commit(SET_MAPSTYLE_SETTING, payload);
	},
};
