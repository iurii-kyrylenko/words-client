import {
    RatedWord,
    WordInfo,
    filterOutUsedAndDups,
    filterPresetOptions,
    filterSize,
    filterWordInfos,
} from "./wordle";
import { presets } from "../const";
import allWords from "./words-rated.json";

type Presets = { [size: number]: string[] };

export const search = (wordSize: number, wordInfos: WordInfo[]) => {
    const presetOptions = (presets as Presets)[wordSize];
    const ratedWords = filterSize(allWords as RatedWord[], wordSize);
    const matches = filterWordInfos(ratedWords, wordInfos)
        .sort((a, b) => b.f - a.f)
        .map((rw) => rw.word);
    const remains = filterOutUsedAndDups(ratedWords, wordInfos)
        .map((rw) => rw.word);
    const options = filterPresetOptions(presetOptions, wordInfos);
    // const option = pickOption(options, matches);
    const option = options[0];
    return { remains, matches, option };
};

// const isIntersect = (option: string, match: string) =>
//     [...option].some((pchar) => [...match].some((mchar) => pchar === mchar));

// const rateOption =  (option: string, matches: string[]) =>
//     matches.reduce((count, match) => isIntersect(option, match) ? count + 1 : count, 0);

// const pickOption = (options: string[], matches: string[]) =>
//     options
//         .map((option) => ({ option, rate: rateOption(option, matches) }))
//         .sort((a, b) => b.rate - a.rate)[0]?.option;
