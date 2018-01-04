const str = (def = '', required = false) => ({ type: String, default: def, required });

const obj = (def = () => ({}), required = false) => ({ type: Object, default: def, required });

const bool = (def = false, required = false) => ({ type: Boolean, default: def, required });

export {
	str,
	obj,
	bool,
};
