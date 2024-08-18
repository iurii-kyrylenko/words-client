import { Status } from "../const";

const letters = [..."abcdefghijklmnopqrstuvwxyz"];

export interface RatedWord {
    word: string;
    f: number;
}

interface LetterInfo {
    char: string;
    status: Status;
}

export type WordInfo = LetterInfo[];

interface Options {
    [char: string]: number ;
}

interface WordState {
    enabled: Set<string>[];
    options: Options;
}

const getWordState = (wordInfo: WordInfo): WordState => {
    const enabled: Set<string>[] = [];
    const options: Options = {};

    wordInfo.forEach(({ char, status }) => {
        enabled.push(new Set(letters));
        if (status === Status.OffSpot) {
            options[char] = options[char] ? options[char] + 1 : 1;
        }
    });

    wordInfo.forEach(({ char, status }, index) => {
        switch(status) {
            case Status.InSpot:
                enabled[index].clear();
                enabled[index].add(char);
                break;
            case Status.OffSpot:
                enabled[index].delete(char);
                break;
            case Status.NotFound:
                if (options[char]) {
                    enabled[index].delete(char);
                } else {
                    enabled.forEach((set) => {
                        if (set.size > 1) {
                            set.delete(char);
                        }
                    });
                }
                break;
        }
    });

    return { enabled, options };
};

const isWordAllowed = (word: string, { enabled, options }: WordState) => {
    const enabledCondition = [...word].every((char, index) => enabled[index].has(char));

    const charMap: Options = {};
    enabled.forEach((set, index) => {
        if (set.size === 1) return;
        const char = word[index];
        charMap[char] = charMap[char] ? charMap[char] + 1 : 1;
    });

    const optionsCondition = Object.keys(options)
        .every((key) => charMap[key] ? charMap[key] >= options[key] : false);

        return enabledCondition && optionsCondition;
    };

export const isWordAllowedAggregate = (word: string, wordStates: WordState[]) =>
    wordStates.every((wordState) => isWordAllowed(word, wordState));

export const filterSize = (words: RatedWord[], wordSize: number) =>
    words.filter((rw) => rw.word.length === wordSize);

export const filterWordInfo = (words: RatedWord[], wordInfo: WordInfo) => {
    const wordState = getWordState(wordInfo);
    return words.filter((rw) => isWordAllowed(rw.word, wordState));
};

export const filterWordInfos = (words: RatedWord[], wordInfos: WordInfo[]) => {
    const wordStates = wordInfos.map(getWordState);
    return words.filter((rw) => isWordAllowedAggregate(rw.word, wordStates));
};

export const filterOutUsedAndDups = (words: RatedWord[], wordInfos: WordInfo[]) => {
    const usedLetters = new Set<string>();
    wordInfos.forEach((wordInfo) =>
        wordInfo.forEach(({ char }) => usedLetters.add(char))
    );
    return words.filter((rw) => {
        const distinctLetters = new Set([...rw.word]).size === rw.word.length;
        return distinctLetters && ![...rw.word].some((char) => usedLetters.has(char));
    });
};

export const filterPresetOptions = (presetOptions: string[], wordInfos: WordInfo[]) => {
    const optionSet = new Set(presetOptions);
    wordInfos.forEach((wordInfo) => {
        const word = wordInfo.map(({ char }) => char).join("");
        optionSet.delete(word);
    });
    return [...optionSet];
};

// MinMax

const getWordInfo = (target: string, guess: string) => {
   const charMap: Options = {};
   [...target].forEach((char) => charMap[char] = charMap[char] ? charMap[char] + 1 : 1);
   [...guess].forEach((char, index) => {
       if (char === target[index] && charMap[char]) {
           charMap[char]--;
       }
   });
   return [...guess].map((char, index) => {
       let status: Status;
       if (char === target[index]) {
           status = Status.InSpot;
       } else if (charMap[char]) {
           status = Status.OffSpot;
           charMap[char]--;
       } else {
           status = Status.NotFound;
       }
       return { char, status };
   });
};

const getMaxPath = (question: string, answers: string[]): number => {
    let max = 0;
    const ratedAnswers = answers.map((word) => ({ word, f: 0 }));
    answers.forEach((answer) => {
        const count = filterWordInfo(ratedAnswers, getWordInfo(answer, question)).length;
        if (count > max) max = count;
    });
    return max;
};

export const getMinMaxQuestions = (questions: string[], answers: string[]) => {
    let min = Number.POSITIVE_INFINITY;
    const minmaxQuestions = questions
        .map((question) => {
            const max = getMaxPath(question, answers);
            if (max < min) min = max;
            return { question, max };
        })
        .filter(({ max }) => max === min)
        .map(({ question }) => question);
    return { questions: minmaxQuestions, minmax: min };
};
