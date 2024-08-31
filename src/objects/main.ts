import { isObject } from "../typeof/typeof.js"

export type ObjectKeyValues = [string[], any[]]

export const kv = (obj: object): ObjectKeyValues => [Object.keys(obj), Object.values(obj)]
export const dekv = (kv: ObjectKeyValues): object =>
	((x, y) => x.reduce((prev, curr, i) => ({ ...prev, [curr]: y[i] }), {}))(...kv)

export const structCheck =
	<Type extends object = object>(...properties: (string | symbol | number)[]) =>
	(x: any): x is Type =>
		isObject(x) && !!x && properties.every((y) => y in x)
