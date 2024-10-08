import { isArray, isObject } from "../typeof/typeof.js"

export const kv = (obj: object): [(string | symbol)[], any[]] => [keys(obj), values(obj)]
export const dekv = (kv: [(string | symbol)[], any[]]): object => {
	const [keys, values] = kv
	const result = {}
	for (let i = 0; i < keys.length; ++i) result[keys[i]] = values[i]
	return result
}

export function structCheck<Type extends object = object>(
	properties:
		| (string | symbol | number)[]
		| { [x: string | symbol | number]: (x: any) => boolean },
	lackingProps: (string | symbol | number)[] = [],
	isStrict: boolean = false
) {
	const propsArr = isArray(properties)
		? Array.from(new Set(properties))
		: keys(properties)
	const propsPredicateArrays = isArray(properties) ? [] : values(properties)
	return (x: any): x is Type =>
		isObject(x) &&
		!!x &&
		propsArr.every((p) => p in x) &&
		lackingProps.every((p) => !(p in x)) &&
		propsPredicateArrays.every((pred, i) => pred(x[propsArr[i]])) &&
		(!isStrict || propsArr.length === keys(x).length)
}

export function keys(object: object) {
	const props: (string | symbol)[] = recursiveStringKeys(object)
	props.push(...recursiveSymbolKeys(object))
	return props
}

export function values(object: object) {
	const vals: any[] = recursiveStringValues(object)
	vals.push(...recursiveSymbolValues(object))
	return vals
}

export function recursiveStringKeys(object: object) {
	const props: string[] = []
	for (const p in object) props.push(p)
	return props
}

export function recursiveStringValues(object: object) {
	const props: any[] = []
	for (const p in object) props.push(object[p])
	return props
}

export function recursiveSymbolKeys(object: object) {
	const symbolProperties = Object.getOwnPropertySymbols(object)
	let proto
	while (Object.prototype !== (proto = Object.getPrototypeOf(object)))
		symbolProperties.push(...Object.getOwnPropertySymbols((object = proto)))
	return symbolProperties
}

export const recursiveSymbolValues = (object: object) =>
	recursiveSymbolKeys(object).map((key) => object[key])

export const ownProperties = (object: object): [(string | symbol)[], any[]] => [
	ownKeys(object),
	ownValues(object)
]

export function ownKeys(object: object) {
	const keys: (string | symbol)[] = Object.getOwnPropertyNames(object)
	keys.push(...Object.getOwnPropertySymbols(object))
	return keys
}

export function ownValues(object: object) {
	return ownKeys(object).map((key) => object[key])
}
