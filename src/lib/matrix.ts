export type Matrix = number[][];

const SECRET_MATRIX = [1, 1, 1, 2];
const INVERSED_SECRET_MATRIX = [2, -1, -1, 1];
const ALPHABET = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,_'\"";

const range = (n: number): number[] => [...Array(n).keys()];

const matrixToArray = (matrix: Matrix): number[] => {
	const numbers: number[] = [];
	const columns = matrix[0].length;
	range(columns).forEach((i) => {
		numbers.push(matrix[0][i]);
		numbers.push(matrix[1][i]);
	});

	return numbers;
}

const arrayToMatrix = (numbers: number[]): Matrix => {
	const matrix: Matrix = [[], []];
	numbers.forEach((v,  i) => {
		// If index odd, push to second array, else push to first
		matrix[i % 2].push(v);
	});

	return matrix;
}

const matrixFromString = (s: string): number[] => {
	const letters = s.split("");
	const numbers = letters.map((v) => ALPHABET.indexOf(v));
	
	// If length of matrix is odd, add padding to make even
	if (numbers.length % 2 === 1) numbers.push(-1);

	return numbers;
}

const applySecret = (numbers: number[], secret: number[]): number[] => {
	// Not sure on the logic behind this but oh well...
	const columns = numbers.length / 2;
	const matrix = arrayToMatrix(numbers);
	const result: Matrix = [[], []];

	for (const i of range(columns)) {
		result[0].push(secret[0] * matrix[0][i] + secret[2] * matrix[1][i]);
		result[1].push(secret[1] * matrix[0][i] + secret[3] * matrix[1][i]);
	}

	return matrixToArray(result);
}

const encode = (s: string): number[] => {
	const numbers = matrixFromString(s);
	return applySecret(numbers, SECRET_MATRIX);
}

const decode = (input: number[]): string => {
	const numbers = applySecret(input, INVERSED_SECRET_MATRIX);
	return numbers.map((v) => ALPHABET.charAt(v)).join("");
}

export {
    encode, decode, arrayToMatrix, matrixFromString, matrixToArray, range
}