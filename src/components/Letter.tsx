import { useMemo } from "react";

export enum Status { NotFound, OffSpot, InSpot };

interface IProps {
    char: string;
    status: Status;
}

export default function Letter({ char, status }: IProps) {
    const statusClass = useMemo(
        () =>
            status === Status.OffSpot ? "bg-yellow-600" :
            status === Status.InSpot ? "bg-green-600" :
            "bg-slate-600",
        [status]
    );
        
    return (
        <div className={`w-12 h-12 grid place-items-center cursor-pointer font-semibold text-4xl text-zinc-50 ${statusClass}`}>
            {char}
        </div>
    );
}
