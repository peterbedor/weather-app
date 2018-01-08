import lockr from 'lockr';

export default lockr.get('weatherMap') || {
	fullscreen: false,
	settings: {
		style: {
			selected: 'mapbox.streets',
			options: {
				bright: {
					name: 'Bright',
				},
				dark: {
					name: 'Dark',
				},
				light: {
					name: 'Light',
				},
				outdoors: {
					name: 'Outdoors',
				},
				satellite: {
					name: 'Satellite',
				},
				streets: {
					name: 'Streets',
				},
			},
		},
	},
};
