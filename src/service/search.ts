import { Status } from "../const";
import allWords from "./words.json";

export const search = (wordSize: number, words: { char: string, status: Status }[][]) => {
    words;
    const remains = allWords.filter((w) => w.length === wordSize && (w[0] === "e" || w[0] === "p"));
    const matches = allWords.filter((w) => w.length === wordSize && (w[0] === "g" || w[0] === "m"));
    return { remains, matches };
};
