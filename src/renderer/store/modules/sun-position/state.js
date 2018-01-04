import lockr from 'lockr';

export default lockr.get('sunPosition') || {
	loaded: false,
	dirty: false,
	updatedAt: null,
	data: {
		sunrise: {
			timestamp: null,
			datetime: null,
		},
		sunriseEnd: {
			timestamp: null,
			datetime: null,
		},
		goldenHourEnd: {
			timestamp: null,
			datetime: null,
		},
		solarNoon: {
			timestamp: null,
			datetime: null,
		},
		goldenHour: {
			timestamp: null,
			datetime: null,
		},
		sunsetStart: {
			timestamp: null,
			datetime: null,
		},
		sunset: {
			timestamp: null,
			datetime: null,
		},
		dusk: {
			timestamp: null,
			datetime: null,
		},
		nauticalDusk: {
			timestamp: null,
			datetime: null,
		},
		night: {
			timestamp: null,
			datetime: null,
		},
		nadir: {
			timestamp: null,
			datetime: null,
		},
		nightEnd: {
			timestamp: null,
			datetime: null,
		},
		nauticalDawn: {
			timestamp: null,
			datetime: null,
		},
		dawn: {
			timestamp: null,
			datetime: null,
		},
	},
};
