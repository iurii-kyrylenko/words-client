import { presets, threshold } from "../const";

export interface IPresets {
    [size: number]: string[];
}

export interface ISettings {
    threshold: number;
    presets: IPresets;
}

export interface IGuessMap {
    firstGuess: string;
    answersCount: number;
    map: {
        [key: number]: { guess: string | null };
    };
}

export interface IDecisionCache {
    [key: string]: string;
}

const answersKey = "answers";
const settingsKey = "settings";
const guessMapKey = "guessMap";
const decisionCacheKey = "decisionCache";

export const storeAnswers = (answers: string[]) => {
    const sAnswers = JSON.stringify(answers, null);
    localStorage.setItem(answersKey, sAnswers);
};

export const retriveAnswers = (): string[] => {
    const sAnswers = localStorage.getItem(answersKey);
    return sAnswers ? JSON.parse(sAnswers) : [];
};

export const storeSettings = (settings: ISettings) => {
    const sSettings = JSON.stringify(settings, null);
    localStorage.setItem(settingsKey, sSettings);
};

export const retriveSettings = (): ISettings => {
    const sSettings = localStorage.getItem(settingsKey);
    return sSettings ? JSON.parse(sSettings) : { presets, threshold };
};

export const storeGuessMap = (guessMap: IGuessMap) => {
    const sGuessMap = JSON.stringify(guessMap, null);
    localStorage.setItem(guessMapKey, sGuessMap);
};

export const retriveGuessMap = (): IGuessMap => {
    const sGuessMap = localStorage.getItem(guessMapKey);
    return sGuessMap ? JSON.parse(sGuessMap) : { firstGuess: null, map: {} };
};

export const storeDecisionCache = (cache: IDecisionCache) => {
    const sCache = JSON.stringify(cache, null);
    localStorage.setItem(decisionCacheKey, sCache);
};

export const retriveDecisionCache = (): IDecisionCache => {
    const sCache = localStorage.getItem(decisionCacheKey);
    return sCache ? JSON.parse(sCache) : {};
};
