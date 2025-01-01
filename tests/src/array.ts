import test, { suite } from "node:test"
import assert from "assert"
import { array } from "../../dist/main.js"
import { isArray } from "../../dist/src/type/type.js"

const {
	isTuple,
	isPair,
	tuple,
	same,
	lastOut,
	last,
	clear,
	insert,
	replace,
	out,
	firstOut,
	first,
	propPreserve,
	copy,
	map,
	filter,
	reduce,
	reduceRight,
	empty,
	uniqueArr
} = array

const getArray = () => [0, 1, 2, 3]

suite("array", () => {
	test("isTuple", () => {
		const isTriple = isTuple(3)
		assert(isTriple(["1", "2", "3"]))
		assert(!isTriple([0, 1]))
		assert(!isTriple(false))
	})

	test("isPair", () => {
		assert(isPair([0, 1]))
		assert(!isPair([0, 1, 2]))
		assert(!isPair(false))
	})

	test("tuple", () => {
		const X = getArray()
		assert(same(tuple(...X), X))
	})

	test("lastOut", () => {
		const X = getArray()
		assert(same(lastOut(X), [0, 1, 2]))
	})

	test("last", () => {
		const X = getArray()
		assert.strictEqual(last(X), 3)
	})

	test("clear", () => {
		const X = getArray()
		assert.strictEqual(X.length, 4)
		clear(X)
		assert(same(X, []))
	})

	test("insert", () => {
		const X = getArray()
		assert(same(insert(X, 1, -1, -2, -3), [0, -1, -2, -3, 1, 2, 3]))
		assert(same(insert(X, 0, 14, 29), [14, 29, 0, 1, 2, 3]))
	})

	test("replace", () => {
		const X: any[] = getArray()
		assert(same(replace(X, 0, "R", "A", "9"), ["R", "A", "9", 1, 2, 3]))
		assert(same(replace(X, 1, true), [0, true, 2, 3]))
	})

	test("out", () => {
		const X = getArray()
		assert(same(out(X, 0), [1, 2, 3]))
		assert(same(out(out(X, 2), 1), [0, 3]))
	})

	test("firstOut", () => {
		const X = getArray()
		assert(same(firstOut(X), [1, 2, 3]))
		assert(same(firstOut(firstOut(X)), [2, 3]))
		assert(same(firstOut([]), []))
	})

	test("first", () => {
		const X = getArray()
		assert.strictEqual(first(X), 0)
		assert.strictEqual(first(firstOut(X)), 1)
	})

	test("propPreserve", () => {
		interface ArrHaving {
			arr: any[]
		}

		const mapPropPreserve = propPreserve((x: ArrHaving) => x.arr, new Set(["length"]))
		const X1 = mapPropPreserve({
			T: 90,
			arr: [40, 40, 19]
		})

		assert.strictEqual(X1.T, 90)
		assert(isArray(X1))

		const X2 = mapPropPreserve({
			length: 90,
			R: 20,
			arr: ["a", "b", "c"]
		})

		assert.strictEqual(X2.length, 3)
		assert.strictEqual(X2.R, 20)
		assert(isArray(X2))
	})

	test("copy", () => {
		const X = getArray()
		const XC = copy(X)
		assert(same(X, XC))
		assert.notStrictEqual(X, XC)
	})

	test("map", () => {
		const X = getArray()
		const square = (x: number) => x ** 2
		assert(same(X.map(square), map(X, square)))
	})

	test("filter", () => {
		const X = getArray()
		const pred = (x: number) => x % 2 === 1
		assert(same(X.filter(pred), filter(X, pred)))
	})

	test("reduce", () => {
		const X = getArray()
		const reductor = (x: number, y: number) => x - y
		assert.strictEqual(X.reduce(reductor), reduce(X, reductor))
	})

	test("reduceRight", () => {
		const X = getArray()
		const reductor = (x: number, y: number) => x - y + x ** y
		assert.strictEqual(X.reduceRight(reductor), reduceRight(X, reductor))
	})

	test("empty", () => {
		assert(same(empty(), []))
		assert.notStrictEqual(empty(), empty())
	})

	test("same", () => {
		const X = getArray()
		assert(same(X, getArray()))
		assert(
			same(
				X.map((x) => x ** 3),
				X,
				(x, y) => x === y ** 3
			)
		)
	})

	test("uniqueArr", () => {
		const X = [0, 1, 1, 2, 2, 2, 3, 1]
		assert(same(uniqueArr(X), getArray()))
	})
})