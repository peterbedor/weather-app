import lockr from 'lockr';

export default lockr.get('weatherAlerts') || {
	loaded: false,
	dirty: false,
	updatedAt: null,
	data: [],
};
