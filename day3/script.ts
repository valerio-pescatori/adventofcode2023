import { expandSideways } from "./expandSideways";
import { day3Input } from "./input";

export const dayThreePartOne = (schematic: string): number => {
	// iterate over the schematic as a 2d array
	// skip every character that is not a symbol
	// check the 8 adjacent cells
	// if a number is found, expand left and right to get the entire number
	// sum them all
	const matrix = schematic.split("\n").map((line) => line.split(""));
	let acc = 0;
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			const symbol = matrix[i][j];
			if (!isNaN(Number(symbol)) || symbol === ".") continue;
			// it's a symbol, check the adjacents
			for (let i2 = -1; i2 < 2; i2++) {
				for (let j2 = -1; j2 < 2; j2++) {
					if (i2 == 0 && j2 === 0) continue; // it's the center (the current symbol)
					const adjacent = matrix[i + i2]?.[j + j2];
					if (adjacent == null) continue;
					if (!isNaN(Number(adjacent))) {
						const [partNumber, newJ2] = expandSideways(matrix, i, i2, j, j2);
						j2 = newJ2;
						acc += partNumber;
					}
				}
			}
		}
	}
	return acc;
};

console.log(dayThreePartOne(day3Input));

export const dayThreePartTwo = (schematic: string): number => {
	// iterate over the schematic as a 2d array
	// skip every character that is not the `*` symbol
	// check the 8 adjacent cells
	// if a number is found, expand left and right to get the entire number
	// calculate the gear ratio if the gear is valid (exatly 2 part numbers)
	const matrix = schematic.split("\n").map((line) => line.split(""));
	let acc = 0;
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			const symbol = matrix[i][j];
			if (symbol !== "*") continue;
			// check the adjacents
			const gearPartNumbers: number[] = [];
			for (let i2 = -1; i2 < 2; i2++) {
				for (let j2 = -1; j2 < 2; j2++) {
					if (i2 == 0 && j2 === 0) continue; // it's the center (the current symbol)
					const adjacent = matrix[i + i2]?.[j + j2];
					if (adjacent == null) continue;
					if (!isNaN(Number(adjacent))) {
						const [partNumber, newJ2] = expandSideways(matrix, i, i2, j, j2);
						j2 = newJ2;
						gearPartNumbers.push(partNumber);
					}
				}
			}
			if (gearPartNumbers.length !== 2) continue;
			acc += gearPartNumbers[0] * gearPartNumbers[1];
		}
	}
	return acc;
};

console.log(dayThreePartTwo(day3Input));
