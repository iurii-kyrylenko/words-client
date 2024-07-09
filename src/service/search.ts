import Hurdle, { WordInfo } from "./hurdle";
import allWords from "./words.json";

export const search = (wordSize: number, words: WordInfo[]) => {
    const hurdle = new Hurdle(allWords, wordSize);
    words.forEach((word) => hurdle.setWordInfo(word));
    const remains = hurdle.filterOutUsedAndDups();
    const matches = hurdle.search();
    return { remains, matches };
};
