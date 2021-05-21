import { train, predict, loadModel, saveModel, loadDataCSV } from '../index.js';

describe('simple-ml-regression', () => {
	describe('loading data', () => {
		it('should load data correctly', async () => {
			// When
			const dataFile = './tests/airfoil_self_noise.csv',
				data = await loadDataCSV(
					dataFile,
					[
						'FREQUENCY',
						'ANGLE_OF_ATTACK',
						'CHORD_LENGTH',
						'VELOCITY',
						'SUCTION'
					],
					['SOUND_LEVEL']
				);

			// Then
			expect(data.xs.length).toBe(1503);
			expect(data.ys.length).toBe(1503);
			expect(data.xs[0].length).toBe(5);
			expect(data.ys[0].length).toBe(1);
		});
	});

	describe('training and predicting', () => {
		it('should train and predict', async () => {
			// Given
			const dataFile = './tests/airfoil_self_noise.csv',
				data = await loadDataCSV(
					dataFile,
					[
						'FREQUENCY',
						'ANGLE_OF_ATTACK',
						'CHORD_LENGTH',
						'VELOCITY',
						'SUCTION'
					],
					['SOUND_LEVEL']
				);

			// When
			const model = train(data, {
				testSplit: 0.5,
				maxDegree: 6,
				epochs: 10
			});

			const predictedResult = predict(
				model,
				[500, 1.5, 0.3048, 39.6, 0.00392107]
			)[0];

			// Then
			expect(model).toBeDefined();
			expect(model.config).toBeDefined();

			const expectedResult = 126.661,
				tolerance = 5;

			// This has potential to be flakey (due to the randomness of training) but
			// hopefully the tolerance is enough so that it will indicate a gross error/failure
			expect(predictedResult).toBeLessThan(expectedResult + tolerance);
			expect(predictedResult).toBeGreaterThan(expectedResult - tolerance);
		});
	});
});
