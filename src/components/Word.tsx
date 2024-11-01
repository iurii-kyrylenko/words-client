import { useCallback } from "react";
import Letter from "./Letter";
import { ICharInfo } from "../store/app-slice";

interface IProps {
    word: ICharInfo[];
    optWord?: string;
    onChange: (letterIndex: number) => void;
}

export default function Word ({ word, optWord, onChange }: IProps) {
    const handleChange = useCallback(
        (letterIndex: number) => () => onChange(letterIndex),
        [onChange]
    );

    return (
        <div className="flex gap-2 select-none">
            {word.map((letter, letterIndex) =>
                <Letter
                    key={letterIndex}
                    {...letter}
                    optChar={optWord ? optWord[letterIndex] : undefined}
                    onChange={handleChange(letterIndex)}
                />
            )}
        </div>
    );
}
