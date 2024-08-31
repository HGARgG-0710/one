import {
	curry,
	or,
	and,
	trivialCompose,
	iterations,
	sequence,
	repeat,
	arrayCompose,
	tupleSlice,
	tuplePick,
	cache,
	cached
} from "../../dist/src/functions/functions.js"
import { sum, product } from "../../dist/src/numbers/numbers.js"

// * 'curry'
const a = (
	x: number | string,
	y: number | string,
	z: number | string,
	d: number | string
) =>
	((x) =>
		!isNaN(x as unknown as number) && typeof d === "number"
			? d * (x as unknown as number)
			: d + x)((x as string) + y + z)

const C = curry(a)
const [b, c, d, e] = [[], [14, 20], ["X", "Y", "SOMETHINGELSE"], [1, 1, "29"]].map(
	(x: any[], i: number) => C(i + 1, ...x)
)

console.log(b.toString())
console.log(b(1, 2, 3, 4))
console.log(c(-4)(2))
console.log(d()(11)())
console.log(e()()()(3)) // note: the multiplication also tries conversion of strings to Number;

console.log()

// * 'or'
const orred = or(
	...["number", "string", "boolean"].map(
		(y) =>
			(...x: any[]) =>
				x.every((x) => typeof x === y)
	)
)
console.log(orred(12340, "323", false))
console.log(orred(true, true, true))
console.log(orred(1, 2, 3))
console.log(orred("I", "Am", "A", "Bug", "Called", "Loosey!"))

console.log()

// * 'and'

const anded = and(
	...["number", "string", "boolean"].map(
		(y) =>
			(...x: any[]) =>
				x.some((x) => typeof x === y)
	)
)
console.log(anded(12340, "323", false))
console.log(anded(false, false, false))
console.log(anded(1, "string"))
console.log(anded("I", true))

console.log()

// * 'trivialCompose'

const polynomial = trivialCompose(
	(x: number) => x ** 3 + 0.2 * x - 1,
	(x: number) => x ** 2,
	(x: number) => x - 15
)
const evaled = (x: number) => (x - 15) ** 6 + 0.2 * (x - 15) ** 2 - 1
const testArr = [15, 20, 11]

console.log(testArr.map(polynomial))
console.log(testArr.map(evaled))

console.log()

// * 'iterations'

console.log(iterations((x: number) => x + 3, 7))
console.log(iterations((x: number) => x + 3, 10, 2))
console.log()

// * 'sequence'
console.log(sequence((x: number) => 2 * x, 20)(1))
console.log()

// * 'repeat'
let i: number | string = 14
repeat((j) => (i += String(j)), 10)
console.log(i)
console.log()

// * 'arrayCompose', 'tupleSlice' and 'tuplePick':
const testSlice = arrayCompose(
	sum,
	tupleSlice([0, 3], [1, 2], [3])(...Array(3).fill(product))
)
console.log(testSlice(77, 29, -2, 30, -1))
const testPick = arrayCompose(
	sum,
	tuplePick(
		(x, i) => [0, 3].includes(i),
		(x, i) => [1, 2].includes(i),
		(x, i) => i === 3
	)(...Array(3).fill(product))
)
console.log(testPick(77, 29, -2, 30, -1))
console.log()

// * 'cache'
const cacheRes = cache((x: number) => x + 3, [9998, 20])
console.log(cacheRes.get(9998))
console.log(cacheRes.get(20))
console.log(cacheRes)
console.log()

// * 'cached'
const cachedResult = cached((x: number) => x + 443)
console.log(cachedResult.cache.has(29))
console.log(cachedResult(29))
console.log(cachedResult.cache.has(29))
console.log(cachedResult(29))
console.log(cachedResult(49))
console.log([...cachedResult.cache.values()])
