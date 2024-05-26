/**
 * @returns the partNumber and the new j2 index
 */
export const expandSideways = (
	matrix: string[][],
	i: number,
	i2: number,
	j: number,
	j2: number
): [number, number] => {
	// collect numbers left and right until possible, return as a numer
	let partNumber = matrix[i + i2][j + j2];
	let shift = 1;
	let nextChar = matrix[i + i2][j + j2 + shift];
	let rMatchAmount = 0;
	while (!isNaN(Number(nextChar))) {
		partNumber += nextChar;
		shift++;
		nextChar = matrix[i + i2][j + j2 + shift];
	}
	rMatchAmount = shift - 1;

	shift = -1;
	nextChar = matrix[i + i2][j + j2 + shift];
	while (!isNaN(Number(nextChar))) {
		partNumber = nextChar + partNumber;
		shift--;
		nextChar = matrix[i + i2][j + j2 + shift];
	}

	// skip j2 to avoid recalculating the same number more than once
	const newJ2 = i2 === -1 || i2 === 1 ? j2 + rMatchAmount : j2;
	return [Number(partNumber), newJ2];
};
