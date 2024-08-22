import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status, wordSizes } from "../const";
import { ISettings, retriveAnswers, storeAnswers, retriveSettings, storeSettings } from "./local-storage";

export interface IWordSize {
    size: number;
    name: string;
}

export interface ICharInfo {
    char: string;
    status: Status;
}

export interface IResults {
    remains: string[];
    matches: string[];
    remainsSize: number;
    matchesSize: number;
}

interface AppState {
    isDarkMode: boolean;
    wordSize: IWordSize;
    words: ICharInfo[][];
    results: IResults;
    answers: string[];
    settings: ISettings;
}

const initialState: AppState = {
    isDarkMode: true,
    wordSize: wordSizes[1],
    words: [],
    results: {
        remains: [],
        matches: [],
        remainsSize: 0,
        matchesSize: 0,
    },
    answers: retriveAnswers(),
    settings: retriveSettings(),
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
        setWordSize: (state, action: PayloadAction<IWordSize>) => {
            state.wordSize = action.payload;
        },
        setWords:  (state, action: PayloadAction<ICharInfo[][]>) => {
            state.words = action.payload;
        },
        setResults:  (state, action: PayloadAction<IResults>) => {
            state.results = action.payload;
        },
        storeAllAnswers: (state, action: PayloadAction<string[]>) => {
            state.answers = action.payload;
            storeAnswers(action.payload);
        },
        storeAnswer: (state, action: PayloadAction<string>) => {
            const answersSet = new Set(state.answers);
            state.answers = [...answersSet.add(action.payload)];
            storeAnswers(state.answers);
        },
        removeAnswer: (state, action: PayloadAction<string>) => {
            const answersSet = new Set(state.answers);
            if (answersSet.delete(action.payload)) {
                state.answers = [...answersSet];
                storeAnswers(state.answers);
            }
        },
        updatePresets: (state, action: PayloadAction<string[]>) => {
            const wordSize = state.wordSize.size;
            state.settings.presets[wordSize] = action.payload;
            storeSettings(state.settings);
        },
        updateThreshold: (state, action: PayloadAction<number>) => {
            state.settings.threshold = action.payload;
            storeSettings(state.settings);
        },
    },
});

export default appSlice.reducer;

export const {
    toggleMode,
    setWordSize,
    setWords,
    setResults,
    storeAllAnswers,
    storeAnswer,
    removeAnswer,
    updatePresets,
    updateThreshold,
} = appSlice.actions;
