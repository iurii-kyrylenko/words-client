import { useCallback } from "react";

interface IResultsProps {
    remains: string[];
    matches: string[];
    answers: Set<string>;
    remainsSize: number;
    matchesSize: number;
    onSelect: (word: string) => void;
}

export default function Results ({
    remains,
    matches,
    answers,
    remainsSize,
    matchesSize,
    onSelect
}: IResultsProps) {
    return (
        <div className="flex gap-4">
            <div className="py-1 px-2 grid gap-x-2  grid-cols-3 h-fit shadow bg-yellow-100 dark:bg-slate-600 dark:text-yellow-200">
                <Result words={remains} answers={answers} size={remainsSize} onSelect={onSelect} />
            </div>
            <div className="py-1 px-2 grid gap-x-2 grid-cols-3 h-fit shadow bg-green-100 dark:bg-slate-600 dark:text-green-200">
                <Result words={matches} answers={answers} size={matchesSize} onSelect={onSelect} />
            </div>
        </div>
    );
}

interface IResultProps {
    words: string[];
    answers: Set<string>;
    size: number;
    onSelect: (word: string) => void;
}

function Result ({ words, answers, size, onSelect }: IResultProps) {
    const handleSelect = (word: string) => () => onSelect(word);

    const underline = useCallback(
        (word: string) => answers.has(word) ? " underline underline-offset-4" : "",
        [answers]
    );

    return (
        <>
            {!words.length && "-----"}
            {words.map((word, index) =>
                <p
                    className={"my-1 cursor-pointer hover:bg-zinc-50 dark:hover:bg-slate-700" + underline(word)}
                    key={index}
                    onClick={handleSelect(word)}
                >
                    {word}
                </p>
            )}
            {size > words.length && "..."}
        </>
    );
}
