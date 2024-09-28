import { isArray, isObject } from "../typeof/typeof.js"

export type ObjectKeyValues = [string[], any[]]

export const kv = (obj: object): ObjectKeyValues => [Object.keys(obj), Object.values(obj)]
export const dekv = (kv: ObjectKeyValues): object =>
	((keys, values) =>
		keys.reduce((prev, curr, i) => {
			prev[curr] = values[i]
			return prev
		}, {}))(...kv)

export function structCheck<Type extends object = object>(
	properties:
		| (string | symbol | number)[]
		| { [x: string | symbol | number]: (x: any) => boolean }
) {
	const propsArr = isArray(properties) ? properties : Object.keys(properties)
	const propsPredicateArrays = isArray(properties) ? [] : Object.values(properties)
	return (x: any): x is Type =>
		isObject(x) &&
		!!x &&
		propsArr.every((y) => y in x) &&
		propsPredicateArrays.every((pred, i) => pred(x[propsArr[i]]))
}
