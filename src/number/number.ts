export const sum = (...numbers: number[]) =>
	numbers.reduce((last, curr) => last + curr, 0)

export const product = (...numbers: number[]) =>
	numbers.reduce((last, curr) => last * curr, 1)

export const min = Math.min

export const max = Math.max
