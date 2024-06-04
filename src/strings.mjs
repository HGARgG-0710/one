export const capitalize = (x) => `${x[0].toUpperCase()}${x.slice(1)}`
export const stringExtract = (string, toExtract) => string.split(toExtract).join("")
export const substringCount = (string, substring) => string.split(substring).length - 1
