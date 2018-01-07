import lockr from 'lockr';
import {
	ENABLE_FULLSCREEN_MAP,
	DISABLE_FULLSCREEN_MAP,
	SET_MAPSTYLE_SETTING,
} from '../../mutation-types';

export default {
	[ENABLE_FULLSCREEN_MAP](state) {
		state.fullscreen = true;

		lockr.set('weatherMap', state);
	},

	[DISABLE_FULLSCREEN_MAP](state) {
		state.fullscreen = false;

		lockr.set('weatherMap', state);
	},

	[SET_MAPSTYLE_SETTING](state, payload) {
		state.settings.style.selected = `mapbox.${payload}`;

		lockr.set('weatherMap', state);
	},
};
