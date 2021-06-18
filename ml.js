import { PolynomialRegressor } from 'regression-multivariate-polynomial';
import { zip, unzip, shuffleArray, sumArray, minIndex } from './arrays.js';

const defaultConfig = {
	testSplit: 0.2,
	maxDegree: 8,
	epochs: 20
};

/**
 * Train a polynomial regression model on a given set of training data
 * @param {TrainingData} trainingData the data to train on
 * @param {object} config optional settings for training the model
 * @param {number} config.testSplit the fraction of data reserved for validating the trained model (default = 0.2)
 * @param {number} config.maxDegree the maximum number of polynomial degrees (default = 8)
 * @param {number} config.epochs the number of iterations to train for (default = 20)
 * @returns A trained model
 */
export function train(trainingData, config = defaultConfig) {
	const xs = trainingData.xs,
		ys = trainingData.ys,
		{ testSplit, maxDegree, epochs } = { ...defaultConfig, ...config },
		data = zip(xs, ys),
		size = data.length,
		trainSize = Math.round((1 - size) * testSplit),
		testSize = size - trainSize,
		initialDegree = 1,
		errorsPerDegree = [];

	for (let degree = initialDegree; degree < maxDegree; degree++) {
		const errors = [];

		for (let epoch = 0; epoch < epochs; epoch++) {
			shuffleArray(data);

			const dataShuffled = unzip(data),
				trainXs = dataShuffled.A.slice(0, trainSize),
				trainYs = dataShuffled.B.slice(0, trainSize),
				testXs = dataShuffled.A.slice(trainSize, size),
				testYs = dataShuffled.B.slice(trainSize, size);

			const model = learn(trainXs, trainYs, degree);

			for (let i = 0; i < testXs.length; i++) {
				const predictedResult = predict(model, testXs[0]),
					actualResult = testYs[0],
					error = predictedResult.map((predicted, index) =>
						calculateError(actualResult[index], predicted)
					);

				errors.push(error);
			}
		}

		const errorTotals = sumArray(errors),
			avgErrors = errorTotals.map((value) => value / epochs / testSize),
			avgErrorTotal = avgErrors.reduce((total, value) => total + value);

		errorsPerDegree.push(avgErrorTotal);

		console.log(`Degree = ${degree}, Error = ${avgErrorTotal}`);
	}

	const bestDegree = initialDegree + minIndex(errorsPerDegree);

	// Train the final model
	const model = learn(xs, ys, bestDegree);
	console.log(
		`Trained the final model on all data with degree = ${bestDegree}.`
	);

	return model;
}

export function learn(xs, ys, degree = 5) {
	const model = new PolynomialRegressor(degree);
	model.fit(xs, ys);

	return model;
}

/**
 * Predict the output based on a given input
 * @param {object} model the model to use
 * @param {Array} xs the inputs
 * @returns {Array} the predicted outputs (ys)
 */
export function predict(model, xs) {
	return model.predict([xs])[0];
}

/**
 * Load a model from a config object
 * @param {object} modelData the raw model data
 * @returns a model
 */
export function loadModel(modelData) {
	const model = new PolynomialRegressor();
	model.fromConfig(modelData);

	return model;
}

/**
 * Returns the model config object
 * @param {object} model the model to save
 * @returns the model object
 */
export function saveModel(model) {
	return model.config;
}

export function calculateError(actual, predicted) {
	// Absolute error
	return Math.abs(actual - predicted);
}
