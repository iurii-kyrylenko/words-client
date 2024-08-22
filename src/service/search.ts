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
import allWords from "./words-rated.json";

interface SearchParams {
    wordSize: number,
    wordInfos: WordInfo[],
    answers: string[],
    presetOptions: string[],
    threshold: number,
}

export const search = ({
    wordSize,
    wordInfos,
    answers,
    presetOptions,
    threshold,
}: SearchParams) => {
    const ratedWords = filterSize(allWords as RatedWord[], wordSize);
    const matches = filterWordInfos(ratedWords, wordInfos)
        .sort((a, b) => b.f - a.f)
        .map((rw) => rw.word);
    const remains = filterOutUsedAndDups(ratedWords, wordInfos)
        .map((rw) => rw.word);

    const option = wordSize === 5
        ? pickOption({ presetOptions, threshold, wordInfos, matches, answers })
        : filterPresetOptions(presetOptions, wordInfos)[0];
    return { remains, matches, option };
};

interface PickOptionParams {
    presetOptions: string[];
    threshold: number;
    wordInfos: WordInfo[];
    matches: string[];
    answers: string[];
}

const pickOption = ({
    presetOptions,
    threshold,
    wordInfos,
    matches,
    answers
}: PickOptionParams) => {
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
