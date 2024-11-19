import { Button } from '@headlessui/react'
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ICharInfo, IWordSize } from '../store/app-slice';
import GuessInput from './GuessInput';

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
    const handleSearch = () => onSearch();
    const handleDelete = () => onDelete();
    const handleInit = () => onInit();

    return (
        <div className="border-0 grid gap-4 grid-cols-2 grid-rows-2 max-[400px]:grid-cols-1">
            <GuessInput wordSize={wordSize.size} onAddGuess={onAdd}/>
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
