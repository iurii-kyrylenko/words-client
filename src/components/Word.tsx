import { useCallback } from "react";
import { Status } from "../const";
import Letter from "./Letter";

interface IProps {
    word: { char: string; status: Status; }[];
    onChange: (letterIndex: number) => void;
}

export default function Word ({ word, onChange }: IProps) {
    const handleChange = useCallback(
        (letterIndex: number) => () => onChange(letterIndex),
        [onChange]
    );

    return (
        <div className="flex gap-2 select-none">
            {word.map((letter, letterIndex) =>
                <Letter key={letterIndex} {...letter} onChange={handleChange(letterIndex)} />
            )}
        </div>
    );
}
