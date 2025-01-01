import { last, lastOut } from "../array/array.js"
import { T } from "../boolean/boolean.js"
import { isUndefined } from "../type/type.js"

/**
 * Provided with a list of functions, lazily executes them in sequence
 * and returns the first truthy result.
 * If all results are falsy - returns the last one
 */
export const or =
	(...fs: Function[]) =>
	(...x: any[]) =>
		fs.reduce((prev, curr) => (prev ? prev : curr(...x)), false)

/**
 * Provided with a list of functions, lazily executes them in sequence
 * and returns the first falsy result.
 * If all results are truthy - returns the last one
 */
export const and =
	(...fs: Function[]) =>
	(...x: any[]) =>
		fs.reduce((prev, curr) => (prev ? curr(...x) : prev), true)

/**
 * Returns the function composition of the `fs` functions.
 */
export const trivialCompose =
	(...fs: Function[]) =>
	(...x: any[]) =>
		lastOut(fs).reduceRight((last, curr) => curr(last), (last(fs) || id)(...x))

/**
 * Returns the array, containing the values of `f(j * i)` for `0 <= i <= floor(n / j)`
 */
export const iterations = (f: Function, n: number, j = 1) =>
	Array.from({ length: Math.floor(n / j) + +(j > 1) }, (_x, i) => f(j * i))

/**
 * Creates a new array `X` = [init],
 * that is then filled with `n` iterations of `f(last(X), i, X)`,
 * and returned
 */
export const sequence = (f: Function, n: number) => (init: any) => {
	const seqres = [init]
	for (let i = 0; i < n; ++i) seqres.push(f(last(seqres), i, seqres))
	return seqres
}

/**
 * Makes the calls `f(0), f(1), ..., f(n)`
 */
export const repeat = (f: Function, n: number) => {
	for (let i = 0; i < n; ++i) f(i)
}

/**
 * Returns a composition, such that expected output of the given functions are arrays
 * intended to be spread out as inputs for the next function.
 */
export const arrayCompose =
	(...fs: Function[]) =>
	(...x: any[]) =>
		fs.reduceRight((last, curr) => curr(...last), x)

/**
 * Creates and returns a `Map`, filled with key-value pairs of `[x, f(x)]` with `x` being in `keys`
 */
export const cache = <
	KeyType = any,
	FunctionType extends (...args: any[]) => any = (...args: any[]) => any
>(
	f: FunctionType,
	keys: KeyType[]
): Map<KeyType, ReturnType<typeof f>> => new Map(keys.map((x) => [x, f(x)]))

/**
 * Breaks the given inputs' array `x` into (possibly intersecting) segments using `x.slice(inds[i])`,
 * then - calls the respective function with each segment, and returns all of the calls'
 * return values in an array.
 *
 * A missing `x.slice`-interval defaults to `[]` (whole signature copying)
 */
export const tupleSlice =
	(...fs: Function[]) =>
	(...inds: ([number?, number?] | undefined)[]) =>
	(...x: any[]) =>
		fs.map((f, i) => f(...x.slice(...(inds[i] || []))))

/**
 * Similar to `tupleSlice`, only difference being that `inds` are now predicates,
 * using which the signatures for each particular function are `x.filter(inds[i])`-ed
 *
 * Like with `tupleSlice`, the default is copying of the entire signature `.filter(T)`
 */
export const tuplePick =
	(...fs: Function[]) =>
	(...inds: ((value?: any, index?: number, array?: any[]) => any)[]) =>
	(...x: any[]) =>
		fs.map((f, i) => f(...x.filter(inds[i] || T)))

/**
 * Returns a function, the inputs of which are cached on each call.
 */
export const cached = (base: Function) => {
	const cachef = function (x: any) {
		const cacheval = cachef.cache.get(x)
		if (!isUndefined(cacheval)) return cacheval
		const retres = base(x)
		cachef.cache.set(x, retres)
		return retres
	}
	cachef.cache = new Map()
	return cachef
}

/**
 * Identity function
 */
export const id = <Type = any>(x: Type) => x

/**
 * No-op function
 */
export const nil = () => {}

/**
 * A function that returns a function, that returns `x`
 */
export const constant =
	<T = any>(x: T) =>
	() =>
		x
