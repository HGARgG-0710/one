import { constant } from "../functional/constant.js"

/**
 * The functional version of `!x`
 */
export const not: (x: any) => boolean = (x: any) => !x

/**
 * Returns `true`. Good for functional applications
 */
export const T = constant<true>(true)

/**
 * Returns `false`. Good for functional applications
 */
export const F = constant<false>(false)

/**
 * The functional version of `x === y`
 */
export const equals = (x: any, y: any) => x === y

/**
 * The curried version of `equals`
 */
export const eqcurry = (x: any) => (y: any) => equals(x, y)
