import {
	mutate,
	insert,
	out,
	lastOut,
	firstOut,
	swap,
	replace
} from "../../dist/src/inplace/inplace.js"
import { isArray, isBoolean, isNumber, isString } from "../../dist/src/typeof/typeof.js"

const testArr: any[] = [44444, "???", true, function () {}, false, Symbol("x")]
testArr.push(testArr)

// * 'mutate'
const mutated = mutate(testArr, (curr, i) =>
	isArray(curr)
		? curr
		: isNumber(curr) || isString(curr)
		? (curr as string) + 1
		: isBoolean(curr)
		? i
		: curr
)
console.log(mutated)
console.log(mutated === testArr)
console.log()

// * 'insert'
const plusMutated = insert(mutated, 4, 890, "HELLOOOO!", () =>
	console.log("i amt avaluulululul")
)
console.log(plusMutated)
console.log(plusMutated === testArr)
console.log()

// * 'out'
const outed = out(plusMutated, 0, 3)
console.log(outed)
console.log(outed === testArr)
console.log()

// * 'lastOut'
const lastTakenOut = lastOut(outed)
console.log(lastTakenOut)
console.log(lastTakenOut === testArr)
console.log()

// * 'firstOut'
const firstTakenOut = firstOut(outed)
console.log(firstTakenOut)
console.log(firstTakenOut === testArr)
console.log()

// * 'swap'
const swapResult = swap(firstTakenOut, 1, 3)
console.log(swapResult)
console.log(swapResult === testArr)
console.log()

// * 'replace'
const replacedResult = replace(swapResult, 2, "SIEG!", Symbol(0), "I am a new value")
console.log(replacedResult)
console.log(replacedResult === testArr)
