import { Button, Description, Field, Input, Listbox, ListboxButton, ListboxOption, ListboxOptions, Textarea } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, ArrowDownOnSquareStackIcon } from '@heroicons/react/24/outline';
import { wordSizes } from "../const";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { IWordSize, setWordSize, storeAllAnswers, updateGuessMap, updatePresets, updateThreshold } from "../store/app-slice";
import { ChangeEvent, MouseEvent, useState } from "react";

export default function Settings () {
    const wordSize = useSelector((state: RootState) => state.wordSize);
    const answers = useSelector((state: RootState) => state.answers);
    const settings = useSelector((state: RootState) => state.settings);
    const guessMap = useSelector((state: RootState) => state.guessMap);
    const dispatch: AppDispatch = useDispatch();
    const [threshold, setThreshold] = useState(settings.threshold.toString());
    const [presets, setPresets] = useState(settings.presets[wordSize.size].join("\n"));

    const handleWordSize = (wordSize: IWordSize) => {
        setPresets(settings.presets[wordSize.size].join("\n"));
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

    const handleUploadGuessMap = (e: ChangeEvent<HTMLInputElement>) => {
        const blob = (e.target.files ?? [])[0];
        const reader = new FileReader();
        reader.readAsText(blob);
        reader.onload = (e) => {
            dispatch(updateGuessMap(JSON.parse(e.target?.result as string)));
        };
    };

    const handleThreshold = (e: ChangeEvent<HTMLInputElement>) => {
        setThreshold(e.target.value);
    }

    const handlePresets = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPresets(e.target.value);
    }

    const handleSaveThreshold = () => {
        dispatch(updateThreshold(Number(threshold)));
    };

    const handleSavePresets = () => {
        const presetArray = presets
            .split("\n")
            .map((s) => s.trim())
            .filter((s) => !!s);
        dispatch(updatePresets(presetArray));
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
                        download={`answers-${answers.length}.json`}
                    >
                        <ArrowDownTrayIcon className="absolute top-2.5 left-2.5 size-5" />
                        <div className="ml-4">{answers.length} answers</div>
                    </a>
                </Button>
            </div>

            <div className="relative">
                <Button className="py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50">
                    <ArrowUpTrayIcon className="absolute top-2.5 left-2.5 size-5" />
                    <div className="ml-4">Up answers</div>
                    <input type="file" accept=".json" onClick={handleUploadStart} onChange={handleUpload} className="absolute top-0 left-0 opacity-0 w-full h-full" />
                </Button>
            </div>

            <div>
                <p className="mb-1 dark:text-zinc-300">
                    Start: {guessMap.firstGuess && `${guessMap.firstGuess.toUpperCase()}
                    | ${guessMap.answersCount}`}
                </p>
                <Button className="relative py-2 rounded-md w-40 bg-sky-200 dark:bg-slate-600 data-[active]:bg-sky-400 data-[active]:dark:bg-slate-800 dark:text-zinc-50">
                    <ArrowUpTrayIcon className="absolute top-2.5 left-2.5 size-5" />
                    <div className="ml-4">Up guess map</div>
                    <input type="file" accept=".json" onClick={handleUploadStart} onChange={handleUploadGuessMap} className="absolute top-0 left-0 opacity-0 w-full h-full" />
                </Button>
            </div>

            <Field className="w-40">
                <Description className="flex justify-between mb-1 dark:text-zinc-300">
                    MinMax Limit
                    <Button onClick={handleSaveThreshold}>
                        <ArrowDownOnSquareStackIcon className="size-5" />
                    </Button>
                </Description>
                <Input
                    type="text"
                    className="p-2 w-40 border dark:border-0 rounded-md dark:bg-slate-600 dark:text-zinc-50"
                    onChange={handleThreshold}
                    value={threshold}
                />
            </Field>

            <Field className="w-40">
                <Description className="flex justify-between mb-1 dark:text-zinc-300">
                    Presets
                    <Button onClick={handleSavePresets}>
                        <ArrowDownOnSquareStackIcon className="size-5" />
                    </Button>
                </Description>
                <Textarea
                    className="p-2 w-40 h-32 resize-none border dark:border-0 rounded-md dark:bg-slate-600 dark:text-zinc-50"
                    value={presets}
                    onChange={handlePresets}
                />
            </Field>

         </div>
    );
}
