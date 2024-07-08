import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';


export default function AppBar() {
    const [isDark, setDark] = useState(false);

    const changeMode = () => {
        setDark(!isDark);
    };

    useEffect(() => {
        const documentClasses = document.documentElement.classList;
        if (isDark) {
            documentClasses.add("dark");
        } else {
            documentClasses.remove("dark");
        }
    }, [isDark]);

    return (
        <nav className="relative flex gap-4 flex-wrap items-center px-4 py-2 lg:py-4 shadow-md bg-sky-200 dark:bg-slate-700 dark:text-gray-300">
            <div className="flex-0">
                <div className="flex items-center">
                    <img
                        className="mr-2 h-10"
                        src="https://cdn-icons-png.flaticon.com/512/8541/8541715.png"
                        alt="Words Logo"
                        loading="lazy" />
                    <span className="font-semibold">Words</span>
                </div>
            </div>
            <div className="flex-1">Hurdle Helper</div>
            <Button onClick={changeMode}>
                {isDark ? <MoonIcon className="size-6" /> : <SunIcon className="size-8"/>}
            </Button>
        </nav>
    );
}
