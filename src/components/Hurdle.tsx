import { useState } from "react";
import { Status } from "../const";
import Actions from "./Actions";
import Results from "./Results";
import Words from "./Words";
import { search } from "../service/search";

interface IResults {
    remains: string[];
    matches: string[];
}

const testWords = [
    [
        { char: "e", status: Status.OffSpot },
        { char: "a", status: Status.NotFound },
        { char: "r", status: Status.NotFound },
        { char: "t", status: Status.OffSpot },
        { char: "h", status: Status.NotFound },
    ],
    [
        { char: "l", status: Status.NotFound },
        { char: "i", status: Status.NotFound },
        { char: "o", status: Status.NotFound },
        { char: "n", status: Status.OffSpot },
        { char: "s", status: Status.NotFound },
    ],
    [
        { char: "d", status: Status.NotFound },
        { char: "u", status: Status.OffSpot },
        { char: "m", status: Status.InSpot },
        { char: "p", status: Status.NotFound },
        { char: "y", status: Status.NotFound },
    ],
];

export default function Hurdle () {
    const [words, setWords] = useState(testWords);
    const [results, setResults] = useState<IResults>({ remains: [], matches: [] });

    const handleChange = (wordIndex: number, letterIndex: number) => {
        setWords((oldWords) => {
            const newWords = [...oldWords];
            const letter = newWords[wordIndex][letterIndex];
            letter.status = getNewStatus(letter.status)
            return newWords;
        });
    };

    const handleSearch = () => setResults(search(5, words));

    return (
        <div className="my-4 ml-4 flex flex-row gap-4 flex-wrap">
            <div className="flex flex-col gap-4">
                <Actions onSearch={handleSearch} />
                <Words
                    words={words}
                    onChange={handleChange}
                />
            </div>
            <Results remains={results.remains} matches={results.matches} />
        </div>
    );
}

const getNewStatus = (status: Status) =>
    status === Status.NotFound ? Status.InSpot :
    status === Status.InSpot ? Status.OffSpot :
    Status.NotFound;
