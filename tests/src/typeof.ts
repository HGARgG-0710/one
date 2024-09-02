import {
	isNumber,
	isFunction,
	isString,
	isBoolean,
	isSymbol,
	isObject,
	isArray
} from "../../dist/src/typeof/typeof.js"

// * 'isNumber'
console.log(isNumber(443))
console.log(isNumber([]))
console.log()

// * 'isFunction'
console.log(isFunction(function () {}))
console.log(isFunction("S"))
console.log()

// * 'isString'
console.log(isString("I AM A STRING!"))
console.log(isString(new String(9990)))
console.log(isString(32))
console.log()

// * 'isBoolean'
console.log(isBoolean(true))
console.log(isBoolean("324"))
console.log(isBoolean(isBoolean("324")))
console.log()

// * 'isSymbol'
console.log(isSymbol(Symbol(324)))
console.log(isSymbol(Symbol.iterator))
console.log(isSymbol(function T() {}))
console.log()

// * 'isObject'
console.log(isObject("3920"))
console.log(isObject({ x: 9990 }))
console.log(isObject(null))
console.log()

// * 'isArray'
console.log(isArray<number | string>(["ddslk", 4324]))
console.log(isArray(null))
console.log(isArray(44))
console.log()
