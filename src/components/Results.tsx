interface IResultsProps {
    remains: string[];
    matches: string[];
    onSelect: (word: string) => void;
}

export default function Results ({ remains, matches, onSelect }: IResultsProps) {
    return (
        <div className="flex gap-4">
            <div className="py-1 px-2 grid gap-x-2  grid-cols-3 h-fit shadow bg-yellow-100 dark:bg-slate-600 dark:text-yellow-200">
                <Result words={remains} onSelect={onSelect} />
            </div>
            <div className="py-1 px-2 grid gap-x-2 grid-cols-3 h-fit shadow bg-green-100 dark:bg-slate-600 dark:text-green-200">
                <Result words={matches} onSelect={onSelect} />
            </div>
        </div>
    );
}

interface IResultProps {
    words: string[];
    onSelect: (word: string) => void;
}

function Result ({ words, onSelect }: IResultProps) {
    const handleSelect = (word: string) => () => onSelect(word);

    return (
        <>
            {!words.length && "-----"}
            {words.map((word, index) =>
            <p
                className="cursor-pointer hover:underline" key={index}
                onClick={handleSelect(word)}
            >
                {word}
            </p>
            )}
        </>
    );
}
