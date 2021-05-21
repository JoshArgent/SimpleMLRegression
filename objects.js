export function filterKeys(object, keys) {
	const keySet = new Set(keys),
		result = {};

	for (const [key, value] of Object.entries(object)) {
		if (keySet.has(key)) {
			result[key] = value;
		}
	}

	return result;
}
