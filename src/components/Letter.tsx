import { useCallback, useMemo } from "react";
import { Status } from "../const";

interface IProps {
    char: string;
    optChar?: string;
    status: Status;
    onChange: () => void;
}

export default function Letter ({ char, optChar, status, onChange }: IProps) {
    const statusClass = useMemo(
        () =>
            status === Status.OffSpot ? "bg-yellow-600" :
            status === Status.InSpot ? "bg-green-600" :
            "bg-slate-600",
        [status]
    );

    const handleClick = useCallback(() => onChange(), [onChange]);

    return (
        <div className="relative">
            <div onClick={handleClick} className={`w-12 h-12 grid place-items-center cursor-pointer font-semibold text-2xl text-zinc-50 ${statusClass}`}>
                {char.toUpperCase()}
            </div>
            {optChar && (
                <div className="absolute top-8 left-8 w-8 h-8 bg-slate-600 rounded-full border z-50 grid place-items-center font-bold text-lg text-zinc-50">
                    {optChar.toUpperCase()}
                </div>
            )}
        </div>
    );
}
