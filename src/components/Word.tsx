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
        <div className="relative">
            <div className="flex gap-2 select-none">
                {word.map((letter, letterIndex) =>
                    <Letter
                        key={letterIndex}
                        {...letter}
                        onChange={handleChange(letterIndex)}
                    />
                )}
            </div>
            {optWord && (
                <div className="absolute top-10 left-2 h-8 bg-slate-700 rounded-full border z-50 grid place-items-center pl-4 tracking-[1em] font-bold text-lg text-zinc-50">
                    {optWord.toUpperCase()}
                </div>
            )}
        </div>
    );
}
