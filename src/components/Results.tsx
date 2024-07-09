interface IResultsProps {
    remains: string[];
    matches: string[];
}

interface IResultProps {
    words: string[];
}

export default function Results ({ remains, matches }: IResultsProps) {
    return (
        <div className="border-0 flex gap-4">
            <div className="py-1 px-2 grid gap-x-2  grid-cols-3 h-fit shadow bg-yellow-100 dark:bg-slate-600 dark:text-yellow-200">
                <Result words={remains}
                />
            </div>
            <div className="py-1 px-2 grid gap-x-2 grid-cols-3 h-fit shadow bg-green-100 dark:bg-slate-600 dark:text-green-200">
            <Result words={matches} />
            </div>
        </div>
    );
}

function Result ({ words }: IResultProps) {
    return (
        <>
            {!words.length && "-----"}
            {words.map((word, index) => <p key={index}>{word}</p>)}
        </>
    );
}
