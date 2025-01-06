import test, { suite } from "node:test"
import assert from "node:assert"

import { number } from "../../dist/main.js"

const { sum, product, min, max } = number

suite("number", () => {
	test("sum", () => {
		assert.strictEqual(sum(1, 2, 3), 6)
		assert.strictEqual(sum(1, 2, 3, 4, 5, 6), 21)
		assert.strictEqual(sum(), 0)
	})

	test("product", () => {
		assert.strictEqual(product(3, 7), 21)
		assert.strictEqual(product(Infinity, 1, 2, 3, 4), Infinity)
		assert.strictEqual(product(), 1)
	})

	test("min", () => {
		assert.strictEqual(min(3, 16, -2, 199), -2)
		assert.strictEqual(min(1, 2), 1)
	})

	test("max", () => {
		assert.strictEqual(max(20, 40, 1), 40)
		assert.strictEqual(max(Infinity, 3), Infinity)
	})
})
