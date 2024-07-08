import Letter, { Status } from "./Letter";

export default function() {
    return (
        <div className="flex gap-2">
            <Letter char="W" status={Status.InSpot} />
            <Letter char="O" status={Status.NotFound} />
            <Letter char="R" status={Status.OffSpot} />
            <Letter char="L" status={Status.OffSpot} />
            <Letter char="D" status={Status.NotFound} />
        </div>
    );
}