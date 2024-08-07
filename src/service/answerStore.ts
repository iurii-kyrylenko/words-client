import { useState } from "react";

const answersKey = "answers";

const storeAnswers = (answers: string[]) => {
    const sAnswers = JSON.stringify(answers, null);
    localStorage.setItem(answersKey, sAnswers);
};

const retriveAnswers = (): string[] => {
    const sAnswers = localStorage.getItem(answersKey);
    return sAnswers ? JSON.parse(sAnswers) : [];
};

export const useAnswerStore = () => {
    const [answers, setAnswers] = useState(() => new Set(retriveAnswers()));

    const storeAnswer = (answer: string) => {
        setAnswers(new Set([...answers.add(answer)])); // new set instance!
        storeAnswers([...answers]);
    };

    const removeAnswer = (answer: string) => {
        if (answers.delete(answer)) {
            setAnswers(new Set([...answers]));
            storeAnswers([...answers]);
        }
    };

    const storeAllAnswers = (answers: string[]) => {
        setAnswers(new Set([...answers]));
        storeAnswers([...answers]);
    };

    return { answers, storeAnswer, removeAnswer, storeAllAnswers };
};
