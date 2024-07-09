import { Button, Input, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const wordSizes = [
    { size: 4, name: "Word size: 4" },
    { size: 5, name: "Word size: 5" },
    { size: 6, name: "Word size: 6" },
];

interface IProps {
    onSearch: () => void;
}

export default function Actions ({ onSearch }: IProps) {
    const [wordSize, setWordSize] = useState(wordSizes[1]);

    const handleSearch = () => onSearch();

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
            <Input type="text" className="py-2 w-40 border dark:border-0 rounded-md text-center dark:bg-slate-600 dark:text-zinc-50" placeholder="Add Word ..." />
            <div className="relative">
                <Button className="py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50">
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
