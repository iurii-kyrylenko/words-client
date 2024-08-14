const answersKey = "answers";

export const storeAnswers = (answers: string[]) => {
    const sAnswers = JSON.stringify(answers, null);
    localStorage.setItem(answersKey, sAnswers);
};

export const retriveAnswers = (): string[] => {
    const sAnswers = localStorage.getItem(answersKey);
    return sAnswers ? JSON.parse(sAnswers) : [];
};
