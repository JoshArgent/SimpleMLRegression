# Simple ML Regression

![npm](https://img.shields.io/npm/v/simple-ml-regression)
![npm bundle size](https://img.shields.io/bundlephobia/min/simple-ml-regression)
[![CI](https://github.com/JoshArgent/SimpleMLRegression/actions/workflows/ci.yml/badge.svg)](https://github.com/JoshArgent/SimpleMLRegression/actions/workflows/ci.yml)

A simple library for training a polynomial regression model from csv training data.

It uses an iterative training algorithm to optimise the model parameters and will return a model that has been trained on all available data.

## Install

```shell
npm install simple-ml-regression
```

## Usage

Given csv training data for the function `x1^2 + 4x2 + x3`:

```csv
X1,X2,X3,Y1
1,1,1,6
2,3,4,20
2,1,1,8
0,1,0,3
etc...
```

Train a polynomial model based on this training data:

```javascript
import { loadDataCSV, train, predict } from 'simple-ml-regression';

loadDataCSV('data.csv', ['X1', 'X2', 'X3', 'Y1']).then((data) => {
	const model = train(data, {
		testSplit: 0.2,
		maxDegree: 12,
		epochs: 50
	});

	const predictedResult = predict(model, [2, 5, 4]);

	console.log(predictedResult);
});
```

Result:

```json
[23]
```
