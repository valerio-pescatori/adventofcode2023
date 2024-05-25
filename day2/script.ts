import { day2Input } from "./input";
// Determine which games would have been possible if the bag had been loaded
// with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum
// of the IDs of those games?

type CubesConfig = Record<"red" | "green" | "blue", number>;

const cubesConfig: CubesConfig = {
	red: 12,
	green: 13,
	blue: 14,
};

export const dayTwoPartOne = (input: string, maxCubes: CubesConfig): number => {
	const idRE = /Game (\d+): /;
	const gameCubesRE =
		/(?:(\d+) (red|green|blue),)?\s?(?:(\d+) (red|green|blue),)?\s?(?:(\d+) (red|green|blue),)?\s?/;
	const games = input.split("\n");

	const result = games.reduce((acc, game) => {
		// - regex to match the id of the game
		// - remove what's before ':' and split by ';'
		// - regex to match the number-color pair
		// - check validity
		// - sum gameI	d if valid
		const gameId = +game.match(idRE)![1];
		game = game.replace(idRE, "");
		const gameSets = game.split("; ").map((s) => s + ","); // adds a ',' to make the last entry easier to match
		// find an invalid entry
		const isValid = !gameSets.some((set) => {
			const gameCubes = gameCubesRE.exec(set)?.slice(1).filter(Boolean)!; // remove the first match and undefined matches (global match)
			for (let i = 0; i < gameCubes.length; i += 2) {
				const value = +gameCubes[i];
				const key = gameCubes[i + 1];
				if (value > maxCubes[key]) return true;
			}
			return false;
		});
		if (isValid) return acc + gameId;
		return acc;
	}, 0);
	return result;
};

// console.log(dayTwoPartOne(day2Input, cubesConfig));

export const dayTwoPartTwo = (input: string): number => {
	const idRE = /Game (\d+): /;
	const gameCubesRE =
		/(?:(\d+) (red|green|blue),)?\s?(?:(\d+) (red|green|blue),)?\s?(?:(\d+) (red|green|blue),)?\s?/;
	const games = input.split("\n");

	const result = games.reduce((acc, game) => {
		// calculate the minSet for this game
		const minSet: CubesConfig = {
			red: 0,
			green: 0,
			blue: 0,
		};
		game = game.replace(idRE, "");
		const gameSets = game.split("; ").map((s) => s + ","); // adds a ',' to make the last entry easier to match

		gameSets.forEach((set) => {
			const gameCubes = gameCubesRE.exec(set)?.slice(1).filter(Boolean)!; // remove the first match and undefined matches (global match)
			for (let i = 0; i < gameCubes.length; i += 2) {
				const value = +gameCubes[i];
				const key = gameCubes[i + 1];
				if (value > minSet[key]) {
					minSet[key] = value;
				}
			}
		});

		// accumulate the minSet power
		return acc + Object.values(minSet).reduce((acc, curr) => acc * curr);
	}, 0);
	return result;
};

console.log(dayTwoPartTwo(day2Input));
