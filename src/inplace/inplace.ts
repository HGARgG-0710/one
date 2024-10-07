export function mutate<Type = any>(
	array: Type[],
	mutation: (x: Type, i: number, arr: Type[]) => any
) {
	let i = array.length
	while (i--) array[i] = mutation(array[i], i, array)
	return array
}

export const insert = <Type = any>(array: Type[], index: number, ...values: Type[]) => {
	array.splice(index, 0, ...values)
	return array
}

export const out = <Type = any>(array: Type[], index: number, count: number = 1) => {
	array.splice(index, count)
	return array
}

export const lastOut = <Type = any>(array: Type[]) => {
	array.pop()
	return array
}

export const firstOut = <Type = any>(array: Type[]) => {
	array.shift()
	return array
}

export const swap = <Type = any>(array: Type[], i: number, j: number) => {
	const temp = array[i]
	array[i] = array[j]
	array[j] = temp
	return array
}

export const replace = <Type = any>(array: Type[], index: number, ...values: Type[]) => {
	array.splice(index, 1, ...values)
	return array
}
