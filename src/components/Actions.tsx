import { Button } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon, ArrowDownOnSquareStackIcon, ArrowUpOnSquareStackIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { ICharInfo, IWordSize } from '../store/app-slice';
import GuessInput from './GuessInput';

interface IProps {
    wordSize: IWordSize;
    words: ICharInfo[][];
    answers: string[];
    onAdd: (word: string) => void;
    onDelete: () => void;
    onSearch: () => void;
    onStore: () => void;
    onRemove: () => void;
}

export default function Actions({
    wordSize,
    words,
    answers,
    onAdd,
    onDelete,
    onSearch,
    onStore,
    onRemove,
}: IProps) {
    const handleSearch = () => onSearch();
    const handleDelete = () => onDelete();
    const handleStoreAnswer = () => onStore();
    const handleRemoveAnswer = () => onRemove();

    const lastWord = useMemo(
        () => (words.slice(-1).pop() ?? []).map(({ char }) => char).join(""),
        [words]
    );

    return (
        <div className="border-0 grid gap-4 grid-cols-2 grid-rows-2 max-[400px]:grid-cols-1">
            <div className="flex justify-center items-center rounded-md border dark:text-zinc-50 dark:border-0 dark:bg-slate-600">
                <p>Answers: {answers.length}</p>
            </div>
            <GuessInput wordSize={wordSize.size} onAddGuess={onAdd}/>
            <div className={"relative" + (lastWord ? "" : " invisible")}>
                <Button
                    className="py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50"
                    onClick={handleStoreAnswer}
                >
                    <ArrowDownOnSquareStackIcon className="absolute top-2.5 left-2.5 size-5" />
                    <div className="ml-4">In "{lastWord}"</div>
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
            <div className={"relative" + (lastWord ? "" : " invisible")}>
                <Button
                    className="py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50"
                    onClick={handleRemoveAnswer}
                >
                    <ArrowUpOnSquareStackIcon className="absolute top-2.5 left-2.5 size-5" />
                    <div className="ml-4">Out "{lastWord}"</div>
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
