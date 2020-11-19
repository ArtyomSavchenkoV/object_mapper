const dataHandler = (inputObject, mapperObject) => {
    // if array
    if (Array.isArray(mapperObject)) {
        return parseArray(inputObject, mapperObject);
    // if object
    } else if (typeof mapperObject === 'object' && mapperObject !== null ) {
        return parseObject(inputObject, mapperObject);
    // if just field
    } else {
        return parseField(inputObject, mapperObject);
    }
};

const parseArray = (inputObject, mapperObject) => { 
	let result = [];
    for (let i in inputObject) {
        const resultField = dataHandler(inputObject[i], mapperObject[0]);
        if (resultField !== undefined) {
            result = result || [];
            result = [...result, resultField];
        }
    }
    return result;
};

const parseObject = (inputObject, mapperObject) => {
	let result = {};
	for (let key in mapperObject) {
		const resultField = dataHandler(inputObject[key], mapperObject[key]);
		if (resultField !== undefined) {
			result = result || {};
			result[key] = resultField;
		}
	}
	return result;
};

const parseField = (field, mask) => {
	if (typeof mask === 'function') {
		return mask(field);
	} else if (
		typeof field === 'string' ||
		typeof field === 'number' ||
		typeof field === 'boolean' ||
		field === null
	) {
		return field;
	} else {
		return undefined;
	}
};

exports.objectMapper = (inputObject, mapperObject) => {
	return dataHandler(inputObject, mapperObject);
}