import { Button, Input, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

const wordSizes = [
    { size: 4, name: "Word size: 4" },
    { size: 5, name: "Word size: 5" },
    { size: 6, name: "Word size: 6" },
];

export default function Actions() {
    const [wordSize, setWordSize] = useState(wordSizes[1]);
    return (
        <div className="p-4 border grid gap-4 grid-cols-2 grid-rows-2">
            <Listbox value={wordSize} onChange={setWordSize}>
                <ListboxButton className="relative border">
                    {wordSize.name}
                    <ChevronDownIcon
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
                        aria-hidden="true"
                    />
                </ListboxButton>
                <ListboxOptions anchor="bottom" className="w-40 bg-blue-100 text-center">
                    {wordSizes.map((size) => (
                        <ListboxOption key={size.size} value={size} className="data-[focus]:bg-blue-200">
                            {size.name}
                        </ListboxOption>
                    ))} 
                </ListboxOptions>
            </Listbox>
            <Input type="text" className="w-40 border text-center" placeholder="Try Word" />
            <div><Button className="py-2 rounded-md w-40 bg-gray-300">Delete Try</Button></div>
            <div><Button className="py-2 rounded-md w-40 bg-gray-300">Search</Button></div>
        </div>
    );
}
