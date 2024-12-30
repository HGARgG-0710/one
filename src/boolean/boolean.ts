/**
 * The functional version of `!x`
 */
export const not: (x: any) => boolean = (x: any) => !x
export const T: () => true = () => true
export const F: () => false = () => false

/**
 * The functional version of `x === y`
 */
export const equals = (x: any, y: any) => x === y

/**
 * The curried version of `equals`
 */
export const eqcurry = (x: any) => (y: any) => equals(x, y)
