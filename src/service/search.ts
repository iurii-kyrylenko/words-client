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
import { IGuessMap, retriveDecisionCache, storeDecisionCache } from "../store/local-storage";

interface SearchParams {
    wordSize: number;
    wordInfos: WordInfo[];
    answers: string[];
    presetOptions: string[];
    threshold: number;
    guessMap: IGuessMap;
}

interface PickOptionParams {
    threshold: number;
    wordInfos: WordInfo[];
    matches: string[];
    answers: string[];
    guessMap: IGuessMap;
}

export const search = ({
    wordSize,
    wordInfos,
    answers,
    presetOptions,
    threshold,
    guessMap,
}: SearchParams) => {
    const ratedWords = filterSize(allWords as RatedWord[], wordSize);
    const matches = filterWordInfos(ratedWords, wordInfos)
        .sort((a, b) => b.f - a.f)
        .map((rw) => rw.word);
    const remains = filterOutUsedAndDups(ratedWords, wordInfos)
        .map((rw) => rw.word);

    const option = wordSize === 5 && guessMap.firstGuess
        ? pickOption({ threshold, wordInfos, matches, answers, guessMap })
        : filterPresetOptions(presetOptions, wordInfos)[0];
    return { remains, matches, option };
};

const pickOption = ({
    threshold,
    wordInfos,
    matches,
    answers,
    guessMap,
}: PickOptionParams) => {
    const answersSet = new Set(answers);
    const matchedAnswers = matches.filter((w) => answersSet.has(w));
    const matchedAnswersLength = matchedAnswers.length;
    const matchedLength = matches.length;

    if (wordInfos.length === 0) {
        return guessMap.firstGuess;
    }

    if (wordInfos.length === 1 && matchedAnswersLength > threshold) {
        const key = infoToNumber(wordInfos[0]).number;
        return guessMap.map[key].guess;
    }

    if (matchedAnswersLength > 0 && matchedAnswersLength < 3) {
        return matchedAnswers[0];
    }

    if (matchedAnswersLength === 0 && matchedLength > 0 && matchedLength < 3) {
        return matches[0];
    }

    if (matchedAnswersLength > 2) {
        return getMinMaxQuestion(answers, matchedAnswers);
    }

    if (matchedAnswersLength === 0 && matchedLength > 2) {
        return getMinMaxQuestion(answers, matches);
    }

    return null;
};

const infoToNumber = (wordInfo: WordInfo) => {
    const word: string[] = [];
    let number = 0;
    wordInfo.forEach(({ char, status }) => {
        word.push(char);
        number = number * 3 + status;
    });
    return { word: word.join(""), number };
};

const memoize = (mmFn: (questions: string[], answers: string[]) =>
    { questions: string[], minmax: number }) => {
        const cache = retriveDecisionCache();

        return (questions: string[], answers: string[]) => {
            const key = hash({ q: questions, a: answers });
            if (!cache[key]) {
                cache[key] = mmFn(questions, answers).questions[0];
                storeDecisionCache(cache);
            }
            return cache[key];
        };
};

const getMinMaxQuestion = memoize(getMinMaxQuestions);
