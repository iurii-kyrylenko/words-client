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
        { char: "E", status: Status.InSpot },
        { char: "A", status: Status.NotFound },
        { char: "R", status: Status.OffSpot },
        { char: "T", status: Status.NotFound },
        { char: "H", status: Status.NotFound },
    ],
    [
        { char: "L", status: Status.NotFound },
        { char: "I", status: Status.OffSpot },
        { char: "O", status: Status.NotFound },
        { char: "N", status: Status.InSpot },
        { char: "S", status: Status.InSpot },
    ],
    [
        { char: "D", status: Status.NotFound },
        { char: "U", status: Status.NotFound },
        { char: "M", status: Status.NotFound },
        { char: "P", status: Status.NotFound },
        { char: "Y", status: Status.NotFound },
    ],
];

export default function Hurdle () {
    const [words, setWords] = useState(testWords);
    const [results, setResults] = useState<IResults>({ remains: ["-----"], matches: ["-----"] });

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
