import Hurdle, { WordInfo } from "./hurdle";
import allWords from "./words.json";

export const search = (wordSize: number, words: WordInfo[]) => {
    const hurdle = new Hurdle(allWords, wordSize);
    words.forEach((word) => hurdle.setWordInfo(word));
    const remains = hurdle.filterOutUsedAndDups();
    const matches = hurdle.search();
    const option = pickOption(hurdle.getOptions(), matches);

    // // <<<
    // // Finf set of remaining letters to exclude
    // const usedLettersSet = hurdle.getState().usedLetters;
    // const remainsLetterSet = new Set("abcdefghijklmnopqrstuvwxyz");
    // usedLettersSet.forEach((char) => remainsLetterSet.delete(char));
    // const matchesLetterSet = new Set<string>();
    // matches.forEach((word) => [...word].forEach((char) => matchesLetterSet.add(char)));
    // remainsLetterSet.forEach((char) => matchesLetterSet.has(char) ? null : remainsLetterSet.delete(char));
    // // Rate remaining letters
    // const remainsLettersRated = [...remainsLetterSet]
    //     .map((char) => ({ char, rate: rateOption(char, matches) }))
    //     .sort((a, b) => b.rate - a.rate);
    // console.log(remainsLettersRated);
    // // Pick 2 most rated letter
    // const most2Rated = remainsLettersRated.slice(0, 2).map(({ char }) => char);
    // console.log(most2Rated);
    // // Get options for most rated
    // const words5 = allWords.filter((w) => w.length === 5);
    // const options = words5.filter((word) => {
    //     const distinctLetters = new Set([...word]);
    //     return most2Rated.every((char) => distinctLetters.has(char));
    // });
    // console.log(options);
    // // >>>

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
