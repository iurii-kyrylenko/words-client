import { Button, Input, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useMemo, useState } from 'react';
import { Status, wordSizes } from '../const';

interface IWordSize {
    size: number;
    name: string;
}

interface IProps {
    wordSize: IWordSize;
    words: { char: string; status: Status; }[][];
    answers: Set<string>;
    onWordSizeChange: (wordSize: IWordSize) => void;
    onAdd: (word: string) => void;
    onDelete: () => void;
    onSearch: () => void;
    onStore: () => void;
}

export default function Actions ({ wordSize, words, answers, onWordSizeChange, onAdd, onDelete, onSearch, onStore }: IProps) {
    const [word, setWord] = useState("");

    const handleSearch = () => onSearch();

    const handleAdd = (event: ChangeEvent<HTMLInputElement>) => {
        const filteredWord = [...event.target.value.toUpperCase()]
            .filter((char) => char.charCodeAt(0) > 64 && char.charCodeAt(0) < 91)
            .join("");
        if (filteredWord.length < wordSize.size) {
            setWord(filteredWord);
        } else if (filteredWord.length === wordSize.size) {
            setWord("");
            onAdd(filteredWord.toLowerCase());
        }
    }

    const handleDelete = () => onDelete();

    const handleStoreAnswer = () => onStore();

    const lastWord = useMemo(
        () => (words.slice(-1).pop() ?? []).map(({ char }) => char).join(""),
        [words]
    );

    return (
        <div className="border-0 grid gap-4 grid-cols-2 grid-rows-2 max-[400px]:grid-cols-1">
            <Listbox value={wordSize} onChange={onWordSizeChange}>
                <ListboxButton className="relative py-2 w-40 border dark:border-0 dark:bg-slate-600 dark:text-zinc-50 rounded-md">
                    {wordSize.name}
                    <ChevronDownIcon className="absolute top-2.5 right-2.5 size-4" />
                </ListboxButton>
                <ListboxOptions anchor="bottom" className="cursor-pointer py-2 w-40 rounded-md bg-sky-200 dark:bg-slate-500 dark:text-zinc-50 text-center">
                    {wordSizes.map((size) => (
                        <ListboxOption key={size.size} value={size} className="data-[focus]:bg-sky-400 data-[focus]:dark:bg-slate-800">
                            {size.name}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
            <Input
                type="text"
                className="py-2 w-40 border dark:border-0 rounded-md text-center dark:bg-slate-600 dark:text-zinc-50" placeholder="Add Answer ..."
                onChange={handleAdd}
                value={word}
            />
            <div className="relative">
                <Button
                    className="py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50"
                    onClick={handleDelete}
                >
                    <XMarkIcon className="absolute top-2.5 left-2.5 size-5" />
                    <div className="ml-4">Delete Answer</div>
                </Button>
            </div>
            <div className="relative">
                <Button
                    className="py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50"
                    onClick={handleSearch}
                >
                    <MagnifyingGlassIcon className="absolute top-2.5 left-2.5 size-5" />
                    Search
                </Button>
            </div>
            <div className="relative">
                {lastWord && <Button
                    className="py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50"
                    onClick={handleStoreAnswer}
                >
                    <CircleStackIcon className="absolute top-2.5 left-2.5 size-5" />
                    <div className="ml-4">Store "{lastWord}"</div>
                </Button>}
            </div>
            <div className="dark:text-zinc-300 content-center">Answers: {answers.size}</div>
        </div>
    );
}
