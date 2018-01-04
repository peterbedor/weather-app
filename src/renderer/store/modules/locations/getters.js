import find from 'lodash/find';

export default {
	locations: state => state.data,
	defaultLocation: state => find(state.data, { default: true }),
	loaded: state => state.loaded,
};
