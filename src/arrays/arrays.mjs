import { kv } from "../objects/main.mjs"

export const lastOut = (x) => x.slice(0, x.length - 1)
export const last = (x) => x[x.length - 1]
export const clear = (x) => (x.length = 0)
export const insert = (x, index, ...values) =>
	x.slice(0, index).concat(values).concat(x.slice(index))

export const replace = (arr, index, ...values) =>
	arr
		.slice(0, index)
		.concat(values)
		.concat(arr.slice(index + 1))

export const out = (array, index) => [...array.slice(0, index), ...array.slice(index + 1)]

export function swapped(array, i, j) {
	if (i > j) return swapped(array, j, i)
	return [
		...array.slice(0, i),
		array[j],
		...array.slice(i + 1, j),
		array[i],
		...array.slice(j + 1)
	]
}

export const firstOut = (x) => x.slice(1)
export const first = (x) => x[0]

export const propPreserve = (f) => (x) => {
	const result = f(x)
	const [keys, values] = kv(x)
	keys.forEach((x, i) => {
		if (isNaN(x)) result[x] = values[i]
	})
	return result
}

export const iterator = (arr) =>
	function* () {
		for (let i = 0; i < arr.length; ++i) yield arr[i]
	}

export const [middleOutP, middleOutN] = [0, 1].map(
	(x) => (arr) => out(arr, Math.floor(arr.length / 2) - x * ((arr.length + 1) % 2))
)
