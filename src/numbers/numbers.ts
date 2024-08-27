export const sum = (...numbers: number[]) =>
	numbers.reduce((last, curr) => last + curr, 0)

export const product = (...numbers: number[]) =>
	numbers.reduce((last, curr) => last * curr, 1)
