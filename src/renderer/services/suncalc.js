import suncalc from 'suncalc';
import moment from 'moment/moment';

/**
 * Get the caluclations for setting the background gradient based on
 * the location
 */
export default (latitude, longitude) => {
	const rawTimes = suncalc.getTimes(moment(), latitude, longitude);
	const times = {};
	const keys = Object.keys(rawTimes);

	for (let i = 0; i < keys.length; i += 1) {
		times[keys[i]] = {
			timestamp: +moment(rawTimes[keys[i]]),
			time: `${rawTimes[keys[i]]}`,
		};
	}

	return times;
};
