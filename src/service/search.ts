import hash from "object-hash";

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
    if (wordSize !== 5) {
        answers = [];
    }
    const presetOptions = (presets as Presets)[wordSize];
    const ratedWords = filterSize(allWords as RatedWord[], wordSize);
    const matches = filterWordInfos(ratedWords, wordInfos)
        .sort((a, b) => b.f - a.f)
        .map((rw) => rw.word);
    const remains = filterOutUsedAndDups(ratedWords, wordInfos)
        .map((rw) => rw.word);

    const option = pickOption({ presetOptions, wordInfos, matches, answers });
    return { remains, matches, option };
};

interface PickOptionParams {
    presetOptions: string[];
    wordInfos: WordInfo[];
    matches: string[];
    answers: string[];
}

const pickOption = ({ presetOptions, wordInfos, matches, answers }: PickOptionParams) => {
    // const threshold = 84;
    const threshold = 42;
    const answersSet = new Set(answers);
    const matchedAnswers = matches.filter((w) => answersSet.has(w));
    const matchedAnswersLength = matchedAnswers.length;
    const matchedLength = matches.length;

    if (wordInfos.length === 0) {
        return filterPresetOptions(presetOptions, wordInfos)[0];
    }

    if (matchedAnswersLength === 1 || matchedAnswersLength === 2) {
        return matchedAnswers[0];
    }

    if (matchedAnswersLength === 0) {
        return matchedLength > threshold
            ? filterPresetOptions(presetOptions, wordInfos)[0]
            : matchedLength < 3
            ? matches[0]
            : getMinMaxQuestion(answers, matches);
    }

    return matchedAnswersLength > threshold
        ? filterPresetOptions(presetOptions, wordInfos)[0]
        : getMinMaxQuestion(answers, matchedAnswers);
};

const memoize = (mmFn: (questions: string[], answers: string[]) =>
    { questions: string[], minmax: number }) => {
        const cash: { [key: string]: string } = {};

        return (questions: string[], answers: string[]) => {
            const key = hash({ q: questions, a: answers });
            if (!cash[key]) {
                cash[key] = mmFn(questions, answers).questions[0];
            }
            return cash[key];
        };
};

const getMinMaxQuestion = memoize(getMinMaxQuestions);
