import { not } from "../boolean/boolean.js"

/**
 * Type for signifying one-variable type predicates
 */
export type TypePredicate<Type = any> = (x?: any) => x is Type

/**
 * A type of all the items `x`, such that `!x` is truthy
 */
export type Falsy = false | 0 | "" | null | undefined

/**
 * Returns whether a given `x` is a number primitive
 */
export const isNumber = (x: any): x is number => typeof x === "number"

/**
 * Returns whether `x` is a function
 */
export const isFunction = (x: any): x is Function => typeof x === "function"

/**
 * Returns whether `x` is a string primitive
 */
export const isString = (x: any): x is string => typeof x === "string"

/**
 * Returns whether `x` is a boolean primitive
 */
export const isBoolean = (x: any): x is boolean => typeof x === "boolean"

/**
 * Returns whether `x` is a symbol primitive
 */
export const isSymbol = (x: any): x is symbol => typeof x === "symbol"

/**
 * Returns whether `x` is an object
 */
export const isObject = <Type extends object = object>(x: any): x is Type =>
	typeof x === "object"

/**
 * Returns whether `x` is `null`
 */
export const isNull = (x: any): x is null => x === null

/**
 * Returns whether `x` is `undefined`
 */
export const isUndefined = (x: any): x is undefined => x === undefined

/**
 * Returns whether `x == null`
 */
export const isNullary = (x: any): x is undefined | null => x == null

/**
 * Returns `typeof x`
 */
export const typeOf = (x: any) => typeof x

/**
 * Returns whether `x` is an `Array`
 */
export const isArray = <Type = any>(x: any): x is Type[] => x instanceof Array

/**
 * Returns whether `x` is a `Set`
 */
export const isSet = <Type = any>(x: any): x is Set<Type> => x instanceof Set

/**
 * Returns a bool indicating whether it is possible to call `Number(x)` without:
 *
 * 1. getting `NaN`
 * 2. getting an error (this happens if `x` is a symbol)
 */
export function isNumberConvertible(x: any): boolean {
	return (
		(isNumber(x) && !isNaN(x)) ||
		(isString(x) && !isNaN(Number(x)) && !!x.length) ||
		isBoolean(x) ||
		isNull(x)
	)
}

/**
 * Returns whether `x` is a truthy value
 */
export const isTruthy = (x: any) => !!x

/**
 * Checks whether the given `x` is `Falsy`
 */
export const isFalsy = not as (x: any) => x is Falsy
