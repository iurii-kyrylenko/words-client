import { Status, options5 } from "../const";

type Letter = string;
type Word = string;
type LetterInfo = { char: Letter; status: Status };
export interface RatedWord {
    word: Word;
    f: number;
}
export type WordInfo = LetterInfo[];
export interface LetterState {
    detected: Letter | null;
    offs: Set<Letter>;
}
export interface WordState {
    usedWords: Set<string>;
    disabledLetters: Set<Letter>;
    usedLetters: Set<Letter>
    options: Set<Letter>;
    letterStates: LetterState[];
}

export default class Hurdle {
    private words: RatedWord[];
    private wordSize: number;
    private history: WordInfo[];
    private wordState: WordState;
    private options: Set<string>;

    constructor(words: RatedWord[], length: number) {
        this.words = words.filter((rw) => rw.word.length === length);
        this.wordSize = length;
        this.history = [];
        this.wordState = {
            usedWords: new Set(),
            disabledLetters: new Set(),
            usedLetters: new Set(),
            options: new Set(),
            letterStates: Array.from(
                { length: this.wordSize },
                () => ({
                    detected: null,
                    offs: new Set(),
                }))
        };
        this.options = length === 5 ? new Set(options5) : new Set();
    }

    setWordInfo(wordInfo: WordInfo) {
        this.history.push(wordInfo);

        const word = wordInfo.map(({ char }) => char).join("");
        this.wordState.usedWords.add(word);
        this.options.delete(word);

        const found = new Set(
            wordInfo
                .filter(({ status }) => status !== Status.NotFound)
                .map(({ char }) => char)
        );

        wordInfo.forEach(({ status, char }, index) => {
            this.wordState.usedLetters.add(char);

            switch (status) {
                case Status.InSpot:
                    this.wordState.letterStates[index].detected = char;
                    break;
                case Status.OffSpot:
                    this.wordState.letterStates[index].offs.add(char);
                    this.wordState.options.add(char);
                    break;
                default: // Status.NotFound:
                    if (!found.has(char)) {
                        this.wordState.disabledLetters.add(char);
                    }
            }
        });
    }

    getState() {
        return this.wordState;
    }

    getHistory() {
        return this.history;
    }

    getOptions() {
        return [...this.options];
    }

    search() {
        return this.words.filter((rw) => {
            const usedWordCondition = !this.wordState.usedWords.has(rw.word);

            const onsCondition = this.wordState.letterStates.reduce(
                (acc, { detected }, index) =>
                    acc &&= detected ? rw.word[index] === detected : true,
                true
            );
            const offCondition = this.wordState.letterStates.reduce(
                (acc, { offs }, index) =>
                    acc &&= offs.size ? !offs.has(rw.word[index]) : true,
                true
            );
            const disableCondition = [...this.wordState.disabledLetters].reduce(
                (acc, char) => acc &&= !rw.word.includes(char),
                true
            );
            const optionsCondition = [...this.wordState.options].reduce(
                (acc, char) => acc &&= rw.word.includes(char),
                true
            );

            return usedWordCondition
                && onsCondition
                && offCondition
                && disableCondition
                && optionsCondition;
        })
            .sort((a, b) => b.f - a.f)
            .map((rw) => rw.word);
    }

    filterOutUsedAndDups() {
        return this.words.filter(
            (rw) => {
                const distinctLetters = new Set([...rw.word]).size === this.wordSize;
                return distinctLetters &&
                    ![...rw.word].some((char) => this.wordState.usedLetters.has(char));
            }
        )
            .sort((a, b) => b.f - a.f)
            .map((rw) => rw.word);
    }
}
