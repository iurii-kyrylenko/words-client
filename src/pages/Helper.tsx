import { Status, displayLimit } from "../const";
import Actions from "../components/Actions";
import Results from "../components/Results";
import Words from "../components/Words";
import { getStartGuess, search } from "../service/search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { ICharInfo, optionalGuessSelector, removeAnswer, setResults, setWords, storeAnswer } from "../store/app-slice";
import QuickActions from "../components/QuickActions";

export default function Helper () {
    const wordSize = useSelector((state: RootState) => state.wordSize);
    const isQuickActions = useSelector((state: RootState) => state.isQuickActions);
    const words = useSelector((state: RootState) => state.words);
    const results = useSelector((state: RootState) => state.results);
    const answers = useSelector((state: RootState) => state.answers);
    const settings = useSelector((state: RootState) => state.settings);
    const guessMap = useSelector((state: RootState) => state.guessMap);
    const optionalGuess = useSelector(optionalGuessSelector);
    const dispatch: AppDispatch = useDispatch();

    const handleChange = (wordIndex: number, letterIndex: number) => {
        const newWords = [...words].map((word) => [...word].map(({ char, status }) => ({ char, status })));
        const letter = newWords[wordIndex][letterIndex];
        letter.status = getNewStatus(letter.status);
        dispatch(setWords(newWords));
    };

    const handleAdd = (word: string) => {
        const newWord = [...word].map((char) => ({ char, status: Status.NotFound }));
        dispatch(setWords([...words, newWord]));
    }

    const handleDelete = () => {
        dispatch(setWords(words.slice(0, -1)));
    };

    const handleInit = () => {
        const startWord = getStartGuess({
            wordSize: wordSize.size,
            presetOptions: settings.presets[wordSize.size],
            guessMap,
        });
        const infos: ICharInfo[][] = startWord
            ? [[...startWord].map((char) => ({ char, status: Status.NotFound }))]
            : [];
        dispatch(setWords(infos));
    };

    const handleSearch = () => {
        const { remains, matches, option } = search({
            wordSize: wordSize.size,
            wordInfos: words,
            answers,
            presetOptions: settings.presets[wordSize.size],
            threshold: settings.threshold,
            guessMap,
        });
        dispatch(setResults({
            remains: remains.slice(0, displayLimit),
            matches: matches.slice(0, displayLimit),
            remainsSize: remains.length,
            matchesSize: matches.length,
        }));
        if (option) {
            handleAdd(option);
        }
    }

    const handleStoreAnswer = () => {
        const lastWordInfo = words.slice(-1).pop();
        if (lastWordInfo) {
            const word = lastWordInfo.map(({ char }) => char).join("");
            dispatch(storeAnswer(word));
        }
    };

    const handleRemoveAnswer = () => {
        const lastWordInfo = words.slice(-1).pop();
        if (lastWordInfo) {
            const word = lastWordInfo.map(({ char }) => char).join("");
            dispatch(removeAnswer(word));
        }
    };

    return (
        <div className="my-4 ml-4 flex flex-row gap-4 flex-wrap">
            <div className="flex flex-col gap-4">
                {isQuickActions &&
                    <QuickActions
                        wordSize={wordSize}
                        words={words}
                        answers={answers}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        onInit={handleInit}
                        onSearch={handleSearch}
                    />
                }
                {!isQuickActions &&
                    <Actions
                        wordSize={wordSize}
                        words={words}
                        answers={answers}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        onSearch={handleSearch}
                        onStore={handleStoreAnswer}
                        onRemove={handleRemoveAnswer}
                    />
                }
                <Words
                    words={words}
                    optWord={optionalGuess}
                    onChange={handleChange}
                />
            </div>
            <Results
                remains={results.remains}
                matches={results.matches}
                answers={new Set(answers)}
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
