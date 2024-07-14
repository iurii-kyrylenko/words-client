import { useState } from "react";
import { Status, displayLimit, wordSizes } from "../const";
import Actions from "./Actions";
import Results from "./Results";
import Words from "./Words";
import { search } from "../service/search";

interface ICharInfo {
    char: string;
    status: Status;
}

interface IResults {
    remains: string[];
    matches: string[];
    remainsSize: number;
    matchesSize: number;
}

export default function Hurdle () {
    const [wordSize, setWordSize] = useState(wordSizes[1]);
    const [words, setWords] = useState<ICharInfo[][]>([]);
    const [results, setResults] = useState<IResults>({
        remains: [],
        matches: [],
        remainsSize: 0,
        matchesSize: 0,
    });

    const handleChange = (wordIndex: number, letterIndex: number) => {
        setWords((oldWords) => {
            const newWords = [...oldWords];
            const letter = newWords[wordIndex][letterIndex];
            letter.status = getNewStatus(letter.status)
            return newWords;
        });
    };

    const handleAdd = (word: string) => {
        setWords((oldWords) => {
            const newWord = [...word].map((char) => ({ char, status: Status.NotFound }));
            const newWords = [...oldWords, newWord];
            return newWords;
        });
    }

    const handleDelete = () => setWords((oldWords) => oldWords.slice(0, -1));

    const handleSearch = () => {
        const { remains, matches, option } = search(wordSize.size, words)
        setResults({
            remains: remains.slice(0, displayLimit),
            matches: matches.slice(0, displayLimit),
            remainsSize: remains.length,
            matchesSize: matches.length,
        });
        if (option) {
            handleAdd(option);
        }
    }

    return (
        <div className="my-4 ml-4 flex flex-row gap-4 flex-wrap">
            <div className="flex flex-col gap-4">
                <Actions
                    wordSize={wordSize}
                    onWordSizeChange={setWordSize}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    onSearch={handleSearch}
                />
                <Words
                    words={words}
                    onChange={handleChange}
                />
            </div>
            <Results
                remains={results.remains}
                matches={results.matches}
                remainsSize={results.remainsSize}
                matchesSize={results.matchesSize}
                onSelect={handleAdd}
            />
        </div>
    );
}

const getNewStatus = (status: Status) =>
    status === Status.NotFound ? Status.InSpot :
    status === Status.InSpot ? Status.OffSpot :
    Status.NotFound;
