import { displayLimit } from "../const";
import Hurdle, { RatedWord, WordInfo } from "./hurdle";
import { getWordInfo } from "./utils";
import allWords from "./words-rated.json";

export const search = (wordSize: number, words: WordInfo[]) => {
    const hurdle = new Hurdle(<RatedWord[]>allWords, wordSize);
    words.forEach((word) => hurdle.setWordInfo(word));
    const remains = hurdle.filterOutUsedAndDups();
    const matches = hurdle.search();
    if (matches.length <= displayLimit) {
        const ratedMatches = rateMatches(wordSize, matches);
        console.log(ratedMatches);
    }
    const option = pickOption(hurdle.getOptions(), matches);
    return { remains, matches, option };
};

const isIntersect = (option: string, match: string) =>
    [...option].some((pchar) => [...match].some((mchar) => pchar === mchar));

const rateOption = (option: string, matches: string[]) =>
    matches.reduce((count, match) => isIntersect(option, match) ? count + 1 : count, 0);

const pickOption = (options: string[], matches: string[]) =>
    options
        .map((option) => ({ option, rate: rateOption(option, matches) }))
        .sort((a, b) => b.rate - a.rate)
        [0]?.option;

const rateMatches = (wordSize: number, matches: string[]) =>
    matches.map((guess) => {
        let sum = 0;
        let max = 0;
        matches.forEach((target) => {
            const hurdle = new Hurdle(matches.map((word) => ({ word, f: 0 })), wordSize);
            hurdle.setWordInfo(getWordInfo(target, guess));
            const result = hurdle.search();
            sum += result.length;
            max = result.length > max ? result.length : max;
        });
        return { guess, mean: sum / matches.length, max };
    })
        .sort((a, b) => a.mean - b.mean);
