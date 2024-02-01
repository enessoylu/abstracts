export const range = (length: number, start = 0) => [...Array(length)].map((_, idx) => idx + start);
