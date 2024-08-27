import { kv } from "../objects/main.js"

export const lastOut = (x: any[]) => x.slice(0, x.length - 1)
export const last = (x: any[]) => x[x.length - 1]
export const clear = (x: any[]) => (x.length = 0)
export const insert = (x: any[], index: number, ...values: any[]) =>
	x.slice(0, index).concat(values).concat(x.slice(index))

export const replace = (arr: any[], index: number, ...values: any[]) =>
	arr
		.slice(0, index)
		.concat(values)
		.concat(arr.slice(index + 1))

export const out = (array: any[], index: number) => [
	...array.slice(0, index),
	...array.slice(index + 1)
]

export function swapped(array: any[], i: number, j: number) {
	if (i > j) return swapped(array, j, i)
	return [
		...array.slice(0, i),
		array[j],
		...array.slice(i + 1, j),
		array[i],
		...array.slice(j + 1)
	]
}

export const firstOut = (x: any[]) => x.slice(1)
export const first = (x: any[]) => x[0]

export const propPreserve = (f: Function) => (x: object) => {
	const result = f(x)
	const [keys, values] = kv(x)
	for (let i = 0; i < keys.length; ++i) {
		const key = keys[i]
		if (isNaN(Number(key))) result[key] = values[i]
	}
	return result
}

export const iterator = (arr: any[]) =>
	function* () {
		for (let i = 0; i < arr.length; ++i) yield arr[i]
	}

export const [middleOutP, middleOutN] = [0, 1].map(
	(x) => (arr: any[]) =>
		out(arr, Math.floor(arr.length / 2) - x * ((arr.length + 1) % 2))
)
