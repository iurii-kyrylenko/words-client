import Hurdle, { RatedWord, WordInfo } from "./hurdle";
import allWords from "./words-rated.json";

export const search = (wordSize: number, words: WordInfo[]) => {
    const hurdle = new Hurdle(<RatedWord[]>allWords, wordSize);
    words.forEach((word) => hurdle.setWordInfo(word));
    const remains = hurdle.filterOutUsedAndDups();
    const matches = hurdle.search();
    const option = pickOption(hurdle.getOptions(), matches);
    return { remains, matches, option };
};

const isIntersect = (option: string, match: string) =>
    [...option].some((pchar) => [...match].some((mchar) => pchar === mchar));

const rateOption =  (option: string, matches: string[]) =>
    matches.reduce((count, match) => isIntersect(option, match) ? count + 1 : count, 0);

const pickOption = (options: string[], matches: string[]) =>
    options
        .map((option) => ({ option, rate: rateOption(option, matches) }))
        .sort((a, b) => b.rate - a.rate)
        [0]?.option;
