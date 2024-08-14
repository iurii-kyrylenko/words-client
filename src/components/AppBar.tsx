import { Button } from "@headlessui/react";
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { toggleMode } from "../store/app-slice";
import { Link } from "react-router-dom";
import { useSwitchMode } from "../hooks/switch-mode";


export default function AppBar () {
    const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
    const dispatch: AppDispatch = useDispatch();
    
    useSwitchMode(isDarkMode);

    const handleToggleMode = () => {
        dispatch(toggleMode());
    };
 
    return (
        <nav className="relative flex gap-4 flex-wrap items-center px-4 py-2 shadow-md bg-sky-200 dark:bg-slate-700 dark:text-zinc-50">
            <div className="flex-0">
                <div className="flex items-center">
                    <img
                        className="mr-2 h-10"
                        src="https://cdn-icons-png.flaticon.com/512/8541/8541715.png"
                        alt="Words Logo"
                        loading="lazy" />
                    <span className="font-semibold">My Wordle</span>
                </div>
            </div>
            <div className="flex-1">
                <Link to="/">Helper</Link>
                {" | "}
                <Link to="/settings">Settings</Link>
            </div>
            <Button onClick={handleToggleMode}>
                {isDarkMode ? <MoonIcon className="size-6" /> : <SunIcon className="size-8"/>}
            </Button>
        </nav>
    );
}
