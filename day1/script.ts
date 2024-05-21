import { input } from "./input";

const map = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const numberKeys = Object.keys(map);

export const dayOne: (data: string) => number = (data: string) =>
  data.split("\n").reduce((acc, curr) => {
    // iterate over string, keep a map of possible matches

    // keep a map whose keys are the indices of a possible match start
    // and the values are the matched substring
    // when a full match is encountered, keep it
    // if a second full match is encountered keep it

    const matches: Record<number, string> = {};

    let i = 0;
    for (const char of curr) {
      // check if it's the start of a possible match
      if (numberKeys.some((s) => s.startsWith(char))) {
        if (matches[i] == null) {
          matches[i] = "";
        }
        matches[i] += char;
      }
      const entries = Object.entries(matches);

      // add char to other possible matches
      entries.forEach(([k, v]) => {
        // avoid adding char to possible match start
        if (+k === i) return;
        // don't add char to full match
        if (numberKeys.includes(v)) return;
        matches[k] += char;
      });

      // delete ruined matches
      entries.forEach(([key, value]) => {
        if (!numberKeys.some((k) => k.startsWith(value))) {
          delete matches[key];
        }
      });

      i++;
    }
    const entries = Object.entries(matches);

    // check for full matches
    let {
      0: [, firstMatch],
      length,
      [length - 1]: [, lastMatch],
    } = entries.filter(([, v]) => numberKeys.includes(v));
    firstMatch = map[firstMatch];
    lastMatch = map[lastMatch];

    return Number(`${firstMatch}${lastMatch}`) + acc;
  }, 0);

console.log(dayOne(input));
