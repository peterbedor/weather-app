import lockr from 'lockr';

export default lockr.get('locations') || {
	loaded: false,
	dirty: false,
	data: [],
};
