/**
 * A function that returns a function, that returns `x`
 */

export const constant =
	<T = any>(x: T) =>
	() =>
		x
