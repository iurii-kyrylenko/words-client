import { useCallback, useMemo } from "react";
import { Status } from "../const";

interface IProps {
    char: string;
    status: Status;
    onChange: () => void;
}

export default function Letter ({ char, status, onChange }: IProps) {
    const statusClass = useMemo(
        () =>
            status === Status.OffSpot ? "bg-yellow-600" :
            status === Status.InSpot ? "bg-green-600" :
            "bg-slate-600",
        [status]
    );

    const handleClick = useCallback(() => onChange(), [onChange]);

    return (
        <div onClick={handleClick} className={`w-12 h-12 grid place-items-center cursor-pointer font-semibold text-4xl text-zinc-50 ${statusClass}`}>
            {char}
        </div>
    );
}
