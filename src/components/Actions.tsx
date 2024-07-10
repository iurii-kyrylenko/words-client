import { Button, Input, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useState } from 'react';
import { wordSizes } from '../const';

interface IProps {
    onAdd: (word: string) => void;
    onDelete: () => void;
    onSearch: () => void;
}

export default function Actions ({ onAdd, onDelete, onSearch }: IProps) {
    const [wordSize, setWordSize] = useState(wordSizes[1]);
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

    return (
        <div className="border-0 grid gap-4 grid-cols-2 grid-rows-2 max-[400px]:grid-cols-1">
            <Listbox value={wordSize} onChange={setWordSize}>
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
                className="py-2 w-40 border dark:border-0 rounded-md text-center dark:bg-slate-600 dark:text-zinc-50" placeholder="Add Word ..."
                onChange={handleAdd}
                value={word}
            />
            <div className="relative">
                <Button
                    className="py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50"
                    onClick={handleDelete}
                >
                    <XMarkIcon className="absolute top-2.5 left-2.5 size-5" />
                    Delete Word
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
        </div>
    );
}
