import { kv } from "../objects/main.js"

export const lastOut = <Type = any>(x: Type[]) => x.slice(0, x.length - 1)
export const last = <Type = any>(x: Type[]) => x[x.length - 1]
export const clear = <Type = any>(x: Type[]) => (x.length = 0)
export const insert = <Type = any>(x: Type[], index: number, ...values: Type[]) =>
	x.slice(0, index).concat(values).concat(x.slice(index))

export const replace = <Type = any>(arr: Type[], index: number, ...values: Type[]) =>
	arr
		.slice(0, index)
		.concat(values)
		.concat(arr.slice(index + 1))

export const out = <Type = any>(array: Type[], index: number) =>
	array.slice(0, index).concat(array.slice(index + 1))

export const firstOut = <Type = any>(x: Type[]) => x.slice(1)
export const first = <Type = any>(x: Type[]) => x[0]

export const propPreserve = (f: Function) => (x: object) => {
	const result = f(x)
	const [keys, values] = kv(x)
	let i = keys.length
	while (i--) {
		const key = keys[i]
		if (isNaN(Number(key))) result[key] = values[i]
	}
	return result
}

export const [middleOutP, middleOutN] = [0, 1].map(
	(x) =>
		<Type = any>(arr: Type[]) =>
			out(arr, Math.floor(arr.length / 2) - x * ((arr.length + 1) % 2))
)

export const copy = <Type = any>(x: Type[]) => ([] as Type[]).concat(x)

export function map<TypeFrom = any, TypeTo = any>(
	array: TypeFrom[],
	f: (item?: TypeFrom, index?: number, array?: TypeFrom[]) => TypeTo
) {
	const mapped: TypeTo[] = Array(array.length)
	let i = array.length
	while (i--) mapped[i] = f(array[i], i, array)
	return mapped
}

export function filter<Type = any>(
	array: Type[],
	prop: (item?: Type, index?: number, array?: Type[]) => boolean
) {
	const filtered: Type[] = []
	for (let i = 0; i < array.length; ++i)
		if (prop(array[i], i, array)) filtered.push(array[i])
	return filtered
}

export function reduce<Type = any>(
	array: Type[],
	f: (item?: any, curr?: Type, i?: number) => any,
	init: any
) {
	let last = init
	for (let i = 0; i < array.length; ++i) last = f(last, array[i], i)
	return last
}

export function reduceRight<Type = any>(
	array: Type[],
	f: (item?: any, curr?: Type, i?: number) => any,
	init: any
) {
	let last = init
	let i = array.length
	while (i--) last = f(last, array[i], i)
	return last
}
