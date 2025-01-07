/**
 * Sets the respective array values to be `mutation(array[i], i, array)`.
 * @returns `array`
 */
export function mutate<Type = any, OutType = any>(
	array: Type[],
	mutation: (x?: Type, i?: number, arr?: Type[]) => OutType
): OutType[] {
	let i = array.length
	while (i--) array[i] = mutation(array[i], i, array) as any
	return array as unknown as OutType[]
}

/**
 * Inserts `values` into `array` at `index`
 * @returns `array`
 */
export const insert = <Type = any>(array: Type[], index: number, ...values: Type[]) => {
	array.splice(index, 0, ...values)
	return array
}

/**
 * Deletes `count` items from `array` at `index`
 * @returns `array`
 */
export const out = <Type = any>(array: Type[], index: number, count: number = 1) => {
	array.splice(index, count)
	return array
}

/**
 * Deletes last `count` items from `array`
 * @returns `array`
 */
export const lastOut = <Type = any>(array: Type[], count = 1) => {
	array.length -= count
	return array
}

/**
 * Deletes first `count` items from `array`
 * @returns `array`
 */
export const firstOut = <Type = any>(array: Type[], count = 1) => out(array, 0, count)

/**
 * Changes places items at indexes `i` and `j` in the array
 * @returns `array`
 */
export const swap = <Type = any>(array: Type[], i: number, j: number) => {
	const temp = array[i]
	array[i] = array[j]
	array[j] = temp
	return array
}

/**
 * Replaces the value in `array` at `index` with `values`
 * @returns array
 */
export const replace = <Type = any>(array: Type[], index: number, ...values: Type[]) => {
	array.splice(index, 1, ...values)
	return array
}
