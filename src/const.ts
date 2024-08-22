export enum Status {
    NotFound,
    OffSpot,
    InSpot
}

export const wordSizes = [
    { size: 4, name: "Word size: 4" },
    { size: 5, name: "Word size: 5" },
    { size: 6, name: "Word size: 6" },
];

export const presets = {
    4: [],
    5: [
        "earth",
        "dings",
        "flock",
        "bumpy",
    ],
    6: [
        "earthy",
        "blinds",
        "mockup",
    ],
};

export const threshold = 42;

export const displayLimit = 96;
