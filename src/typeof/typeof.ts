export const isNumber = (x: any): x is number => typeof x === "number"
export const isFunction = (x: any): x is Function => typeof x === "function"
export const isString = (x: any): x is string => typeof x === "string"
export const isBoolean = (x: any): x is boolean => typeof x === "boolean"
export const isSymbol = (x: any): x is symbol => typeof x === "symbol"
export const isObject = <Type extends object = object>(x: any): x is Type =>
	typeof x === "object"

export const isNull = (x: any): x is null => x === null
export const isUndefined = (x: any): x is undefined => x === undefined
export const typeOf = (x: any) => typeof x

export const isArray = <Type = any>(x: any): x is Type[] => x && x.constructor === Array
