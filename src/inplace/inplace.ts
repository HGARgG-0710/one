export function mutate(array: any[], mutation: (x: any, i: number, arr: any[]) => any) {
	for (let i = 0; i < array.length; ++i) array[i] = mutation(array[i], i, array)
	return array
}

export const insert = (array: any[], index: number, ...values: any[]) => {
	array.splice(index, 0, ...values)
	return array
}

export const out = (array: any[], index: number, count: number = 1) => {
	array.splice(index, count)
	return array
}

export const lastOut = (array: any[]) => {
	array.pop()
	return array
}

export const firstOut = (array: any[]) => {
	array.shift()
	return array
}

export const swap = (array: any[], i: number, j: number) => {
	const temp = array[i]
	array[i] = array[j]
	array[j] = temp
	return array
}
