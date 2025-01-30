import test, { suite } from "node:test"
import assert from "node:assert"

import { boolean } from "../../../dist/main.js"
const { not, T, F, equals, eqcurry } = boolean

suite("boolean", () => {
	test("not", () => assert(not(false)))
	test("T", () => assert.strictEqual(T(), true))
	test("F", () => assert.strictEqual(F(), false))

	test("equals", () => {
		assert(equals(3, 3))
		assert(!equals({}, {}))
		assert(!equals(true, false))
		assert(!equals(null, undefined))
	})

	test("eqcurry", () => {
		assert(eqcurry(3)(3))
		assert(!eqcurry({})({}))
		assert(!eqcurry(true)(false))
		assert(!eqcurry(null)(undefined))
	})
})
