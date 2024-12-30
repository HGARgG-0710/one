/**
 * Sums all the given numbers and returns the result
 */
export const sum = (...numbers: number[]) =>
	numbers.reduce((last, curr) => last + curr, 0)

/**
 * Returns the product of all the given numbers
 */
export const product = (...numbers: number[]) =>
	numbers.reduce((last, curr) => last * curr, 1)

/**
 * Returns the minimum value of the given numbers
 */
export const min = Math.min

/**
 * Returns the maximum value of the given numbers
 */
export const max = Math.max
