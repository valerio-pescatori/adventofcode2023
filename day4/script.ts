import { dayFourInput } from "./input";

export const dayFourPartTwo = (input: string): number => {
	const cards = input.split("\n");
	const memo: Record<number, number> = {};
	const cleanupRE = /Card\s+(\d+):\s+/;
	for (let cardKey = cards.length - 1; cardKey !== 0; cardKey--) {
		let card = cards[cardKey];
		card = card.replace(cleanupRE, "");
		const [_winningNumbers, _yourNumbers] = card.split(" | ");
		const winningNumbers = _winningNumbers.split(" ").filter(Boolean);
		const yourNumbers = _yourNumbers.split(" ").filter(Boolean);
		// calculate the number of cards that this card wins
		const cardPoints = winningNumbers.reduce(
			(acc, curr) => acc + +yourNumbers.includes(curr),
			0
		);
		// i must add 1 for the initial scratchcard and the amount of scratchard for all the
		// duplicated scratchards that i won
		let totalCardPoints = 1;
		for (let nextCard = 1; nextCard <= cardPoints; nextCard++) {
			// i'm iterating bottom-up so every following card has already been calculated
			totalCardPoints += memo[cardKey + nextCard];
		}
		memo[cardKey] = totalCardPoints;
	}
	const totalCards = Object.values(memo).reduce((acc, card) => acc + card, 0);
	return totalCards;
};

console.log(dayFourPartTwo(dayFourInput));
