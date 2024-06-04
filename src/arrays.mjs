export const lastOut = (x) => x.slice(0, x.length - 1)
export const last = (x) => x[x.length - 1]
export const clear = (x) => (x.length = 0)
export const insert = (x, index, ...values) =>
	x.slice(0, index).concat(values).concat(x.slice(index))

export const replace = (arr, index, value) =>
	arr
		.slice(0, index)
		.concat([value])
		.concat(arr.slice(index + 1))

export const out = (array, index) => [...array.slice(0, index), ...array.slice(index + 1)]

export function swapped(array, i, j) {
	if (i > j) return swapped(array, j, i)
	return [
		...array.slice(0, i),
		array[j],
		...array.slice(i + 1, j),
		array[i],
		...array.slice(j)
	]
}
