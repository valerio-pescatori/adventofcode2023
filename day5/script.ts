import { mapList, seeds } from "./input";
import { mapToNextCategory } from "./mapToNextCategory";

const dayFivePartOne = (seeds: number[], mapList: number[][][]): number => {
	let lowestLocation = +Infinity;

	seeds.forEach((seed) => {
		let currentInput = seed;
		mapList.forEach((map) => {
			currentInput = mapToNextCategory(currentInput, map);
		});
		if (currentInput < lowestLocation) {
			lowestLocation = currentInput;
		}
	});
	return lowestLocation;
};

console.log(dayFivePartOne(seeds, mapList));
