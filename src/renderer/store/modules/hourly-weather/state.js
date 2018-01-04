import lockr from 'lockr';

export default lockr.get('hourlyWeather') || {
	loaded: false,
	dirty: false,
	updatedAt: null,
	summary: null,
	icon: null,
	data: [],
};
