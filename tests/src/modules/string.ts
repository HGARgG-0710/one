import test, { suite } from "node:test"
import assert from "node:assert"

import { string } from "../../../dist/main.js"
const { capitalize, extract, count, limit, concat, cover, isEmpty } = string

suite("string", () => {
	test("capitalize", () => {
		assert.strictEqual(capitalize(), "")
		assert.strictEqual(capitalize("oUT oF Order"), "Out of order")
		assert.strictEqual(capitalize("OUT OF ORDER"), "Out of order")
	})

	test("extract", () => {
		assert.strictEqual(
			extract("iamanemail@gmail.com", /@.*\.com/g, ".online"),
			"iamanemail.online"
		)
		assert.strictEqual(
			extract("Michael Ellis? Who on Earth is Michael Ellis?!", "Ellis", "Johnson"),
			"Michael Johnson? Who on Earth is Michael Johnson?!"
		)
	})

	test("count", () =>
		assert.strictEqual(
			count("John McDougal, John Doggett, John the Crow", "John"),
			3
		))

	test("limit", () =>
		assert.strictEqual(
			limit(25, "... Boo!")("And there I sat, drinking tea"),
			"And there I sat, drinking... Boo!"
		))

	test("concat", () =>
		assert.strictEqual(concat("Xenomorph", "Yves", "Zeus"), "XenomorphYvesZeus"))

	test("cover", () =>
		assert.strictEqual(cover("911", "4123", "Brooklyn", "Square"), "9113klyn"))

	test("isEmpty", () => {
		assert(isEmpty(""))
		assert(!isEmpty("Bark"))
	})
})
