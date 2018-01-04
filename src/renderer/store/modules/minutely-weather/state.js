import lockr from 'lockr';

export default lockr.get('minutelyWeather') || {
	loaded: false,
	dirty: false,
	updatedAt: null,
	summary: null,
	icon: null,
	data: [],
};
