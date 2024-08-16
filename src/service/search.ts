import {
    RatedWord,
    WordInfo,
    filterOutUsedAndDups,
    filterPresetOptions,
    filterSize,
    filterWordInfos,
    getMinMaxQuestions,
} from "./wordle";
import { presets } from "../const";
import allWords from "./words-rated.json";

type Presets = { [size: number]: string[] };

export const search = (wordSize: number, wordInfos: WordInfo[], answers: string[]) => {
    const presetOptions = (presets as Presets)[wordSize];
    const ratedWords = filterSize(allWords as RatedWord[], wordSize);
    const matches = filterWordInfos(ratedWords, wordInfos)
        .sort((a, b) => b.f - a.f)
        .map((rw) => rw.word);
    const remains = filterOutUsedAndDups(ratedWords, wordInfos)
        .map((rw) => rw.word);
    const option = filterPresetOptions(presetOptions, wordInfos)[0];

    if (matches.length > 2 && matches.length < 301) {
        const mmQuestions = getMinMaxQuestions(answers, matches);
        console.log(mmQuestions);
    }

    return { remains, matches, option };
};
