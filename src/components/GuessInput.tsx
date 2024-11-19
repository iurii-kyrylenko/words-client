import { Input } from "@headlessui/react";
import { ChangeEvent, useState } from "react";

export default function GuessInput({
    wordSize,
    onAddGuess,
}: {
    wordSize: number;
    onAddGuess: (word: string) => void;
}) {
    const [word, setWord] = useState("");

    const handleAdd = (event: ChangeEvent<HTMLInputElement>) => {
        const filteredWord = [...event.target.value.toUpperCase()]
            .filter((char) => char.charCodeAt(0) > 64 && char.charCodeAt(0) < 91)
            .join("");
        if (filteredWord.length < wordSize) {
            setWord(filteredWord);
        } else if (filteredWord.length === wordSize) {
            setWord("");
            onAddGuess(filteredWord.toLowerCase());
        }
    }
    return (
        <Input
            type="text"
            className="py-2 w-40 border dark:border-0 rounded-md text-center dark:bg-slate-600 dark:text-zinc-50" placeholder="Add guess ..."
            onChange={handleAdd}
            value={word}
        />
    );
}