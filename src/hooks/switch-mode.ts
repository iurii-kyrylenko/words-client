import { useEffect } from "react";

export const useSwitchMode = (isDarkMode: boolean) =>
    useEffect(() => {
        const documentClasses = document.documentElement.classList;
        if (isDarkMode) {
            documentClasses.add("dark");
        } else {
            documentClasses.remove("dark");
        }
    }, [isDarkMode]);
