import { mapSplitter } from "./input";

export const easierSeeds = "79 14 55 13".split(" ").map(Number);

const seedToSoilMap = mapSplitter(`50 98 2
52 50 48`);

const soilToFertilizerMap = mapSplitter(`0 15 37
37 52 2
39 0 15`);

const fertilizerToWaterMap = mapSplitter(`49 53 8
0 11 42
42 0 7
57 7 4`);

const waterToLightMap = mapSplitter(`88 18 7
18 25 70`);

const lightToTemperatureMap = mapSplitter(`45 77 23
81 45 19
68 64 13`);

const temperatureToHumidityMap = mapSplitter(`0 69 1
1 0 69`);

const humidityToLocationMap = mapSplitter(`60 56 37
56 93 4`);

export const easierMapList = [
	seedToSoilMap,
	soilToFertilizerMap,
	fertilizerToWaterMap,
	waterToLightMap,
	lightToTemperatureMap,
	temperatureToHumidityMap,
	humidityToLocationMap,
];
