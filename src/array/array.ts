import { isArray, isNumberConvertible, isUndefined } from "../type/type.js"
import { ownProperties } from "../object/main.js"
import { constant } from "../functional/constant.js"
import { equals } from "../boolean/boolean.js"
import { difference } from "../number/number.js"

export type Pair<A = any, B = A> = [A, B]
export type Pairs<A = any, B = A> = Pair<A, B>[]

/**
 * A generic type for representation of N-tuples with the same type.
 *
 * Creates a type of `[Type, ...]` (`LowLim` items) `| [Type, ...]` (`LowLim + 1` items) `| ... | [Type, ...]` (`UpLim` items).
 *
 * Example:
 *
 * `type Z = Tuple<number, 0, 3>`
 *
 * `type O = Tuple<string, 4>`
 *
 * Are the same as:
 *
 * `type Z = [] | [number] | [number, number] | [number, number, number]`
 *
 * `type O = [string, string, string, string]`
 */
export type Tuple<
	Type,
	LowLim extends number,
	UpLim extends number = LowLim
> = LowLim extends LowLim
	? number extends LowLim
		? Type[]
		: LowLim extends UpLim
		? _TupleOfBase<Type, LowLim, []>
		: _TupleOf<Type, Tuple<Type, LowLim>, Tuple<Type, UpLim>, []>
	: never

type _TupleOfBase<
	Type,
	Limit extends number,
	Rem extends unknown[]
> = Rem["length"] extends Limit ? Rem : _TupleOfBase<Type, Limit, [...Rem, Type]>

type _TupleOf<
	Type,
	LowLim extends unknown[],
	UpLim extends unknown[],
	Rem extends unknown[]
> = LowLim["length"] extends 0
	? [] | (UpLim["length"] extends 0 ? never : _TupleOf<Type, [Type], UpLim, []>)
	: Rem["length"] extends LowLim["length"]
	? Rem
	:
			| _TupleOf<Type, LowLim, UpLim, [...Rem, Type]>
			| (LowLim["length"] extends UpLim["length"]
					? never
					: _TupleOf<Type, [...LowLim, Type], UpLim, Rem>)

/**
 * Returns a predicate, purpose of which is to indicate that the argument `x` is a `Tuple`,
 * with `.length` being precisely `n`.
 */
export const isTuple =
	<Items extends number>(n: number) =>
	<Type>(x: any): x is Tuple<Type, Items> =>
		isArray(x) && x.length === n

/**
 * A predicate, purpose of which is to determine that the given item is an array of length 2.
 */
export const isPair = isTuple(2) as <A = any, B = any>(x: any) => x is Pair<A, B>

/**
 * A type-only no-op function, purpose of which is to treat the given arguments as an array of respective specific type.
 */
export const tuple = <T extends any[]>(...args: T): T => args

/**
 * A function for creating a copy of the given array without the last `count` elements (by default - 1)
 */
export const lastOut = <Type = any>(x: Type[], count = 1) => x.slice(0, x.length - count)

/**
 * A function for obtaining the last element of the given array.
 */
export const last = <Type = any>(x: Type[]) => x[lastIndex(x)]

/**
 * Sets the value of the last element of the array `x` to be `v`.
 * @returns `v`
 */
export const setLast = <T = any>(x: T[], v: T) => (x[lastIndex(x)] = v)

/**
 * A function for mutating the given array via setting its` `.length` to `0`.
 */
export const clear = <Type = any>(x: Type[]) => (x.length = 0)

/**
 * A function for creating a copy of the array with `values` inserted into it at `index`, and `replaceNum(x)` items skipped.
 */
export const insertion =
	(replaceNum: (x: any[]) => number) =>
	<Type = any>(x: Type[], index: number, ...values: Type[]) =>
		x
			.slice(0, index)
			.concat(values)
			.concat(x.slice(index + replaceNum(x)))

/**
 * Same as `insertion(constant(0))`. Creates a copy, which is a result of inserting items at a given index without any removal
 */
export const insert = insertion(constant(0))

/**
 * Same as `insertion(constant(1))`. Creates a copy, which is a result of inserting items at a given index, removing only a single item
 */
export const replace = insertion(constant(1))

/**
 * Creates a copy of a given array, which is a result of removal of `count` items from the given index (default - a single item);
 */
export const out = <Type = any>(array: Type[], index: number, count = 1) =>
	array.slice(0, index).concat(array.slice(index + count))

/**
 * Creates a copy of a given array, with the first `count` items removed (by default - 1)
 */
export const firstOut = <Type = any>(x: Type[], count = 1) => x.slice(count)

/**
 * Gets the first item of the array
 */
export const first = <Type = any>(x: Type[]) => x[0]

/**
 * Calls `f` on `x`, assigning all the own keys on `x`, that are not in `excluded` to `x`.
 *
 * Useful for creating "hybrid" arrays from existing objects.
 */
export const propPreserve = (f: Function, excluded: (string | symbol)[] = []) => {
	const excludedSet = new Set(excluded)
	return (x: object) => {
		const result = f(x)
		const [keys, values] = ownProperties(x)
		let i = keys.length
		while (i--) {
			const key = keys[i]
			if (!isNumberConvertible(key) && !excludedSet.has(key))
				result[key] = values[i]
		}
		return result
	}
}

/**
 * Creates a copy of the given array
 */
export const copy = <Type = any>(x: Type[]) => ([] as Type[]).concat(x)

/**
 * Creates and returns a new array. Same functionality as `array.map(f)`.
 *
 * Better performance for much larger inputs (no engine input size optimizations)
 */
export function map<TypeFrom = any, TypeTo = any>(
	array: TypeFrom[],
	f: (item?: TypeFrom, index?: number, array?: TypeFrom[]) => TypeTo
) {
	const mapped: TypeTo[] = Array(array.length)
	let i = array.length
	while (i--) mapped[i] = f(array[i], i, array)
	return mapped
}

/**
 * Creates and returns a new array. Same functionality as `array.prop(f)`.
 *
 * Better performance for much larger inputs (no engine input size optimizations)
 */
export function filter<Type = any>(
	array: Type[],
	prop: (item?: Type, index?: number, array?: Type[]) => boolean
) {
	const filtered: Type[] = []
	for (let i = 0; i < array.length; ++i)
		if (prop(array[i], i, array)) filtered.push(array[i])
	return filtered
}

/**
 * Creates and returns a new array. Same functionality as `array.reduce(f, init)`.
 *
 * Better performance for much larger inputs (no engine input size optimizations)
 */
export function reduce<Type = any>(
	array: Type[],
	f: (item?: any, curr?: Type, i?: number) => any,
	init?: any
) {
	const initLacking = isUndefined(init)
	let result = initLacking ? array[0] : init
	for (let i = +initLacking; i < array.length; ++i) result = f(result, array[i], i)
	return result
}

/**
 * Creates and returns a new array. Same functionality as `array.reduceRight(f, init)`
 *
 * Better performance for much larger inputs (no engine input size optimizations)
 */
export function reduceRight<Type = any>(
	array: Type[],
	f: (item?: any, curr?: Type, i?: number) => any,
	init?: any
) {
	const initLacking = isUndefined(init)
	let result = initLacking ? last(array) : init
	let i = array.length - +initLacking
	while (i--) result = f(result, array[i], i)
	return result
}

/**
 * Allocates and returns a new empty array.
 */
export const empty = (): [] => []

/**
 * Conducts the comparison of two iterables `a` and `b`
 * by converting them to arrays and using element-by-element `pred(a[i], b[i], i)`.
 *
 * For comparison to yield `true`, it is required for both arrays to have the same length.
 *
 * `pred` defaults to `(x, y) => x === y`
 */
export const same = (
	a: Iterable<any>,
	b: Iterable<any>,
	pred: (x?: any, y?: any, i?: any) => boolean = equals
) => {
	const [aarr, barr] = [a, b].map((x) => Array.from(x))
	return aarr.length === barr.length && aarr.every((x, i) => pred(x, barr[i], i))
}

/**
 * Creates the array consisting of all the unique items of the given
 * Iterable, in the order in which they appear
 */
export const uniqueArr = <T = any>(x: Iterable<T>) => Array.from(new Set<T>(x))

/**
 * Returns either the first truthy element of `x`, or `last(x)`
 */
export const or = <T = any>(x: T[]) => {
	for (const curr of x) if (curr) return curr
	return last(x)
}

/**
 * Returns either the first falsy element of `x` or `last(x)`
 */
export const and = <T = any>(x: T[]) => {
	for (const curr of x) if (!curr) return curr
	return last(x)
}

/**
 * Creates a function returning new shallow copies of `array` [useful for factoring-out/remembering information about the array`s contents]
 */
export const allocator =
	<T = any>(array: T[]) =>
	() =>
		copy(array)

/**
 * Returns the last index of a given array
 */
export const lastIndex = (array: any[]) => array.length - 1

/**
 * @returns whether the given array is empty
 */
export const isEmpty = (array: any[]) => !array.length

/**
 * Recursively applies `array.same(a[i], b[i], i)` for `a[i]` and `b[i]` - arrays,
 * to the given arrays `a` and `b` (otherwise, applying `pred(a[i], b[i], i)`),
 * and returns the result.
 */
export const recursiveSame = (
	a: any[],
	b: any[],
	pred: (x?: any, y?: any, i?: number) => boolean = equals
) =>
	a.length === b.length &&
	a.every((ax, i) =>
		isArray(ax) && isArray(b[i]) ? recursiveSame(ax, b[i], pred) : pred(a[i], b[i], i)
	)

/**
 * Calls `array.sort(order)` with `order` defaulting to `number.difference`
 */
export const sort = <T = any>(
	array: T[],
	order: (a: any, b: any) => number = difference
) => array.sort(order)

/**
 * Creates a new function, which creates a new array, indexes of which
 * defined by the `indexes` Set, are filled with `values` [in increasing order],
 * the remaining ones being filled by the values of the `x` array
 */
export const substitute = (n: number, indexes: Set<number>) => {
	const filledIndexes = sort(Array.from(indexes)).filter((x) => x < n)
	const limIndexes = new Set(filledIndexes)
	return (values: any[]) => {
		const protoArr = Array(n)
		for (let i = 0, vi = 0; i < filledIndexes.length; ++i)
			protoArr[filledIndexes[i]] = values[vi++]
		const restIndexes = Array.from(protoArr.keys().filter((x) => !limIndexes.has(x)))
		return (x: any[]) => {
			const final = protoArr
			for (let i = 0; i < restIndexes.length; ++i) final[restIndexes[i]] = x[i]
			return copy(final)
		}
	}
}

/**
 * Returns the array of keys for the given array `x`
 */
export const keys = <T = any>(x: T[]) => Array.from(x.keys())

/**
 * Returns the array of values for the given array `x`
 */
export const values = <T = any>(x: T[]) => Array.from(x.values())

/**
 * Returns an Array of numbers from `0` to `n`s
 */
export const numbers = (n: number) => Array(n).map((_x, i) => i)
