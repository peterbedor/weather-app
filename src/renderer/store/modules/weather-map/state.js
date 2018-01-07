import lockr from 'lockr';

export default lockr.get('weatherMap') || {
	fullscreen: false,
	settings: {
		style: {
			selected: 'mapbox.streets',
			options: {
				bright: {
					name: 'Bright',
					active: false,
				},
				dark: {
					name: 'Dark',
					active: false,
				},
				light: {
					name: 'Light',
					active: false,
				},
				outdoors: {
					name: 'Outdoors',
					active: false,
				},
				satellite: {
					name: 'Satellite',
					active: false,
				},
				streets: {
					name: 'Streets',
					active: false,
				},
			},
		},
	},
};
