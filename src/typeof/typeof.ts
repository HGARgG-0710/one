export const isNumber = (x: any): x is number => typeof x === "number"
export const isFunction = (x: any): x is Function => typeof x === "function"
export const isString = (x: any): x is string => typeof x === "string"
export const isBoolean = (x: any): x is boolean => typeof x === "boolean"
export const isSymbol = (x: any): x is symbol => typeof x === "symbol"
export const isObject = (x: any): x is object => typeof x === "object"

export const isArray = (x: any): x is any[] => x instanceof Array
