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
import { IGuessMap } from "../store/local-storage";

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
    const matchedSet = new Set(matches);
    const matchedAnswers = answers.filter((w) => matchedSet.has(w));
    const matchedAnswersLength = matchedAnswers.length;
    const matchedLength = matches.length;

    if (wordInfos.length === 0) {
        return guessMap.firstGuess;
    }

    if (matchedAnswersLength > 0 && matchedAnswersLength < 3) {
        return matchedAnswers[0];
    }

    const key = getInfosPath(wordInfos);
    if (guessMap.map[key]) {
        return guessMap.map[key];
    }

    if (matchedAnswersLength > 2 && matchedAnswersLength < threshold) {
        return getMinMaxQuestion(answers, matchedAnswers);
    }

    if (matchedAnswersLength === 0 && matchedLength > 0 && matchedLength < 3) {
        return matches[0];
    }

    if (matchedAnswersLength === 0 && matchedLength > 2 && matchedLength < threshold) {
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

const getInfosPath = (wordInfos: WordInfo[]) => wordInfos.map((info) => {
    const { word, number } = infoToNumber(info);
    const ternary = number.toString(3).padStart(5, "0");
    return `${word}-${ternary}`;
}).sort().join("|");

const memoize = (mmFn: (questions: string[], answers: string[]) =>
    { questions: string[], minmax: number }) => {
        const cache: { [key: string]: string } = {};

        return (questions: string[], answers: string[]) => {
            const key = hash({ q: questions, a: answers });
            if (!cache[key]) {
                cache[key] = mmFn(questions, answers).questions[0];
            }
            return cache[key];
        };
};

const getMinMaxQuestion = memoize(getMinMaxQuestions);
