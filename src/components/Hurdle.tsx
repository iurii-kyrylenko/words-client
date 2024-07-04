import Actions from "./Actions";
import Results from "./Results";
import Tries from "./Tries";

export default function Hurdle() {
    return (
        <div className="my-4 ml-4 flex flex-row gap-4 flex-wrap">
            <div className="flex flex-col gap-4">
                <Actions />
                <Tries />
            </div>
            <Results />
        </div>
    );
}