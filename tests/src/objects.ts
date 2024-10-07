import { T } from "../../dist/src/boolean/boolean.js"
import { or } from "../../dist/src/functions/functions.js"
import {
	kv,
	dekv,
	structCheck,
	toMap,
	keys,
	values
} from "../../dist/src/objects/objects.js"
import {
	isArray,
	isBoolean,
	isFunction,
	isNumber,
	isString
} from "../../dist/src/typeof/typeof.js"

// * 'kv'
console.log(kv({ a: "T", [Symbol("c")]: "K", 0: 4 }))
console.log(kv({}))
console.log()

// * 'dekv'
console.log(dekv(kv({ a: "T", [Symbol("c")]: "K", 0: 4 })))
console.log(dekv(kv({})))
console.log()

// * 'keys', 'values'
const zSymb = Symbol("Z")
function X() {
	this.C = 342
	this.L = true
}
X.prototype.S = {}
X.prototype[zSymb] = "?!"
const x = new X()
console.log(keys(x))
console.log(values(x))
console.log()

// * 'structCheck' [using arrays]
interface K {
	A: any
	B: any
	D: any
	Kar: any
}
const arrCheck = structCheck<K>(["A", "B", "D", "kar"])
console.log(arrCheck(null))
console.log(arrCheck({}))
console.log(arrCheck({ A: 33, D: 334, C: 23 }))
console.log(arrCheck(2))
console.log(arrCheck({ A: 343, B: undefined, D: 88, kar: null }))
console.log(arrCheck({ A: 343, B: undefined, D: 88, kar: null, L: 0b0110 }))
console.log()

// * 'structCheck' [using objects]
interface P {
	C: Function
	D: number
	A: boolean | string
	AL: any[]
	X: any
}
const objCheck = structCheck<P>({
	C: isFunction,
	D: isNumber,
	A: or(isBoolean, isString),
	AL: isArray,
	X: T
})
console.log(objCheck(null))
console.log(objCheck({}))
console.log(objCheck({ s: [] }))
console.log(objCheck({ AL: ["??"] }))
console.log(objCheck({ D: 443, AL: ["??"] }))
console.log(objCheck({ C: () => {}, D: "443", AL: ["??"] }))
console.log(objCheck({ A: true, C: () => {}, D: 443, AL: ["??"], X: null }))
console.log(objCheck({ A: "AARATG", C: () => {}, D: 443, AL: ["??"], X: null, R: 90 }))
console.log(objCheck({ A: 20, C: () => {}, D: 443, AL: ["??"], X: null, R: 90 }))
console.log()

// * 'structCheck' [using lacking properties]
const objCheckForbidden = structCheck(
	{
		L: T,
		S: T
	},
	["M", "K"]
)
console.log(objCheckForbidden(x))
x.M = 0
console.log(objCheckForbidden(x))
delete x.M
x.K = 908
console.log(objCheckForbidden(x))
delete x.K
x.R = 47
console.log(objCheckForbidden(x))
delete x.L
console.log(objCheckForbidden(x))
console.log()

// * 'structCheck' [using strict types]
const objCheckStrict = structCheck(["L", "S", "C", zSymb], [], true)
const y = new X()
console.log(objCheckStrict(y))
y.N = 90
console.log(objCheckStrict(y))
delete y.N
delete y.C
console.log(objCheckStrict(y))
console.log()

// * 'toMap'
const obj = { x: 909, 123: true, f: function () {} }
console.log(obj)
console.log(toMap(obj))
