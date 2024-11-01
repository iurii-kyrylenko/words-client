import { useCallback } from "react";
import Word from "./Word";
import { ICharInfo } from "../store/app-slice";

interface IProps {
    words: ICharInfo[][];
    optWord?: string;
    onChange: (wordIndex: number, letterIndex: number) => void;
}

export default function Words ({ words, optWord, onChange }: IProps) {
    const handleChange = useCallback(
        (wordIndex: number) => (letterIndex: number) => onChange(wordIndex, letterIndex),
        [onChange]
    );

    return (
        <div className="border-0 flex flex-col gap-2">
            {words.map((word, wordIndex) =>
                <Word
                    key={wordIndex}
                    word={word}
                    optWord={wordIndex === words.length - 1 ? optWord : undefined}
                    onChange={handleChange(wordIndex)}
                />
            )}
        </div>
    );
}
