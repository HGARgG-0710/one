import test, { suite } from "node:test"
import assert from "node:assert"

import { isNumber, isString } from "../../dist/src/type/type.js"

import { functional } from "../../dist/main.js"
import { max } from "../../dist/src/number/number.js"
import { same } from "../../dist/src/array/array.js"
const {
	or,
	id,
	and,
	trivialCompose,
	iterations,
	sequence,
	repeat,
	arrayCompose,
	cache,
} = functional

suite("functional", () => {
	test("or", () => {
		const isEveryNum = (...x: any[]) => x.every(isNumber)
		const or1 = or(isEveryNum, (...x: any[]) => x.every(isString))
		const or2 = or(isEveryNum, isString)
		const or3 = or(id)

		assert(or1())
		assert(or2())
		assert(!or3())

		assert(or1(3, 2, 1))
		assert(or1("3", "2", "1"))
		assert(!or1("3", "2", null))

		assert(or2(3, 2, 1))
		assert(!or2(3, "A", 1))
		assert(!or2(3, "A", "B"))
		assert(or2("C", "A", "B"))
		assert(or2("C", 2, 1))

		assert(!or3(false, false, false))
		assert.strictEqual(or3(null, false, false), null)
		assert.strictEqual(or3(false, false), false)
		assert(or3(true, false, false))
		assert(or3(true, true, true))
	})

	test("and", () => {
		const and1 = and(
			(...x: any[]) => x.some(isNumber),
			(...x: any[]) => x.some(isString)
		)

		const and2 = and(id)

		assert(!and1())
		assert(!and2())

		assert(and1(10, 90, "S", "R"))
		assert(!and1(10, 90))
		assert(!and1("S", "R"))

		assert(and2(10, true, "S"))
		assert(!and2(false))
		assert.strictEqual(and2(0), 0)
		assert.strictEqual(and2(10, 19, 44), 10)
	})

	test("trivialCompose", () => {
		assert.strictEqual(
			trivialCompose(
				(x: number) => x - 7,
				(x: number) => x ** 2,
				(...x: number[]) => max(...x) + 5
			)(20, 11, -94),
			618
		)
	})

	test("iterations", () => {
		const f = (i: number) => i ** 2
		const iter1 = iterations(f, 5)
		const iter2 = iterations(f, 10, 3)

		assert(same(iter1, [0, 1, 2, 3, 4].map(f)))
		assert(same(iter2, [0, 3, 6, 9].map(f)))
	})

	test("sequence", () =>
		assert(
			same(
				sequence((x: number) => 2 * x, 20)(1),
				[1].concat(
					Array(20)
						.fill(0)
						.map((_, i) => 2 ** (i + 1))
				)
			)
		))

	test("repeat", () => {
		let i = 0
		repeat((j: number) => (i += j), 11)
		assert.strictEqual(i, 55)
	})

	test("arrayCompose", () => {
		const f = arrayCompose(
			(x: number, y: number, z: number) => (x + y + z) / 2,
			(x: number, y: number) => [x ** 2, x * y + 3, (x + y) ** 2],
			(x: number) => [x + 3, x ** 2]
		)

		assert.strictEqual(f(1), 24)
		assert.strictEqual(f(10), 7120.5)
	})

	test("cache", () => {
		const prequoted = cache(
			(quote: string) => (a: string) => `${quote}${a}`,
			["'", '"']
		)

		assert.strictEqual(prequoted.get("'")!("stapleton"), "'stapleton")
		assert.strictEqual(prequoted.get('"')!("?"), '"?')
	})
})
