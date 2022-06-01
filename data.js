import csv from 'csvtojson';
import { filterKeys } from './objects.js';

/**
 * Load rows of data from a CSV file
 * @param {string} file the file path
 * @param {Array[string]} xColumns the names of the x (input) columns
 * @param {Array[string]} yColumns the names of the y (output) columns
 * @returns
 */
export function loadDataCSV(file, xColumns, yColumns) {
	return new Promise((resolve, reject) => {
		csv()
			.fromFile(file)
			.on('error', (error) => reject(error))
			.then((data) => {
				const xs = data.map((row) =>
					Object.values(filterKeys(row, xColumns)).map(parseFloat)
				);
				const ys = data.map((row) =>
					Object.values(filterKeys(row, yColumns)).map(parseFloat)
				);

				resolve(new TrainingData(xs, ys));
			});
	});
}

/**
 * A class representing training data
 */
export class TrainingData {
	constructor(xs, ys) {
		this._xs = xs;
		this._ys = ys;
	}

	get xs() {
		return this._xs;
	}

	get ys() {
		return this._ys;
	}
}
