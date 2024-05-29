export const mapToNextCategory = (source: number, mapper: number[][]) => {
	let output = source;
	mapper.forEach((mapEntry) => {
		// check if source is mapped
		const [destinationRangeStart, sourceRangeStart, rangeLength] = mapEntry;
		const isMapped =
			source >= sourceRangeStart && source < sourceRangeStart + rangeLength;
		if (!isMapped) return;
		const delta = source - sourceRangeStart;
		output = destinationRangeStart + delta;
	});
	return output;
};
