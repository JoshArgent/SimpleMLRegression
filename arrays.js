export function zip(arrayA, arrayB) {
	return arrayA.map((itemA, index) => {
		return { A: itemA, B: arrayB[index] };
	});
}

export function unzip(array) {
	const result = { A: [], B: [] };

	array.forEach(({ A, B }) => {
		result.A.push(A);
		result.B.push(B);
	});

	return result;
}

export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export function sumArray(array) {
	const sums = [];

	for (let i = 0; i < array.length; i++) {
		for (let k = 0; k < array[i].length; k++) {
			if (sums.length <= k) {
				sums.push(array[i][k]);
			} else {
				sums[k] += array[i][k];
			}
		}
	}

	return sums;
}

export function minIndex(array) {
	return array.indexOf(Math.min.apply(Math, array));
}
