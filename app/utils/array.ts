export const shuffleArray = <T>(arr: T[]): T[] => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        swap(arr, i, j);
    }
    return arr;
};

export const swap = (arr: any[], first: number, sec: number) => {
    const temp = arr[first];
    arr[first] = arr[sec];
    arr[sec] = temp;
};

export const average = (arr: number[]): number => {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
};

export const getRandom = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};
