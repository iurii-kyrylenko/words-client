import { presets, threshold } from "../const";

export interface IPresets {
    [size: number]: string[];
}

export interface ISettings {
    threshold: number;
    presets: IPresets;
}

const answersKey = "answers";
const settingsKey = "settings";

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
