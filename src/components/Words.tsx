import { useCallback } from "react";
import { Status } from "./Letter";
import Word from "./Word";

interface IProps {
    words: { char: string; status: Status; }[][];
    onChange: (wordIndex: number, letterIndex: number) => void;
}

export default function Words ({ words, onChange }: IProps) {
    const handleChange = useCallback(
        (wordIndex: number) => (letterIndex: number) => onChange(wordIndex, letterIndex),
        []
    );

    return (
        <div className="border-0 flex flex-col gap-2">
            {words.map((word, wordIndex) =>
                <Word key={wordIndex} word={word} onChange={handleChange(wordIndex)} />
            )}
        </div>
    );
}
