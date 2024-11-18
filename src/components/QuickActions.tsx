import { Button, Input } from '@headlessui/react'
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useState } from 'react';
import { ICharInfo, IWordSize } from '../store/app-slice';

interface IProps {
    wordSize: IWordSize;
    words: ICharInfo[][];
    answers: string[];
    onAdd: (word: string) => void;
    onDelete: () => void;
    onInit: () => void;
    onSearch: () => void;
}

export default function QuickActions({
    wordSize,
    onAdd,
    onDelete,
    onInit,
    onSearch,
}: IProps) {
    const [word, setWord] = useState("");

    const handleSearch = () => onSearch();
    const handleDelete = () => onDelete();
    const handleInit = () => onInit();

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

    return (
        <div className="border-0 grid gap-4 grid-cols-2 grid-rows-2 max-[400px]:grid-cols-1">
            <Input
                type="text"
                className="py-2 w-40 border dark:border-0 rounded-md text-center dark:bg-slate-600 dark:text-zinc-50" placeholder="Add guess ..."
                onChange={handleAdd}
                value={word}
            />
            <div className="relative">
                <Button
                    className="py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50"
                    onClick={handleInit}
                >
                    <ArrowPathIcon className="absolute top-2.5 left-2.5 size-5" />
                    <div className="ml-4">1st guess</div>
                </Button>
            </div>
            <div className="relative">
                <Button
                    className="py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50"
                    onClick={handleDelete}
                >
                    <XMarkIcon className="absolute top-2.5 left-2.5 size-5" />
                    <div className="ml-4">Remove guess</div>
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
