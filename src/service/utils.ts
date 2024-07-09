import { Status } from "../const";
import { WordInfo, WordState }  from "./hurdle";

// https://en.m.wikipedia.org/wiki/ANSI_escape_code#Colors:
enum Color {
    Red = 31,
    Green = 32,
    Yellow = 33,
    Blue = 34,
    Magenta = 35,
    Cyan = 36,
    White = 37,
    Gray = 90,
}
const formatColor = (color: Color) => `\x1b[${color}m%s\x1b[0m`;

const infoColorMap = {
    [Status.InSpot]: Color.Green,
    [Status.OffSpot]: Color.Magenta,
    [Status.NotFound]: Color.Gray,
};

const displayInfo = (info: WordInfo) => {
    const letters = info.map(({ char }) => char.toUpperCase().padStart(2));
    const format = info.map(({ status }) => formatColor(infoColorMap[status])).join("");
    console.log.apply(null, [format, ...letters]);
};

export const displayHistory = (history: WordInfo[]) => history.map(displayInfo);

export const displayState = (state: WordState) => {
    console.log({
        used: [...state.usedLetters].join(" "),
        disabled: [...state.disabledLetters].join(" "),
        options: [...state.options].join(" "),
        letters: state.letterStates.map((letterState) => ({
            detected: letterState.detected,
            offs: [...letterState.offs].join(" "),
        })),
    });
};
