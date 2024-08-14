import { Button, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { wordSizes } from "../const";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { IWordSize, setWordSize, storeAllAnswers } from "../store/app-slice";
import { ChangeEvent, MouseEvent } from "react";

export default function Settings () {
    const wordSize = useSelector((state: RootState) => state.wordSize);
    const answers = useSelector((state: RootState) => state.answers);
    const dispatch: AppDispatch = useDispatch();

    const handleWordSize = (wordSize: IWordSize) => {
        dispatch(setWordSize(wordSize));
    };

    const handleUploadStart = (e: MouseEvent<HTMLInputElement>) => {
        e.currentTarget.value = "";
    };

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const blob = (e.target.files ?? [])[0];
        const reader = new FileReader();
        reader.readAsText(blob);
        reader.onload = (e) => {
            dispatch(storeAllAnswers(JSON.parse(e.target?.result as string)));
        };
    };

    return (
        <div className="m-6 grid grid-cols-1 gap-6">
            <Listbox value={wordSize} onChange={handleWordSize}>
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

            <div className="relative">
                <Button className="py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50">
                    <a
                        href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(answers, null, 2))}`}
                        download="answers.json"
                    >
                        <ArrowDownTrayIcon className="absolute top-2.5 left-2.5 size-5" />
                        <div className="ml-4">{answers.length} answers</div>
                    </a>
                </Button>
            </div>

            <div className="relative">
                <Button className="py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50">
                    <ArrowUpTrayIcon className="absolute top-2.5 left-2.5 size-5" />
                    <div className="ml-4">Upload</div>
                    <input type="file" accept=".json" onClick={handleUploadStart} onChange={handleUpload} className="absolute top-0 left-0 opacity-0 w-full h-full" />
                </Button>
            </div>
         </div>
    );
}
