import test, { suite } from "node:test"
import assert from "node:assert"

import type { KeyValues } from "../../dist/src/object/main.js"

import { recursiveSame } from "../../dist/src/array/array.js"
import { isArray, isNumber, isString, isTruthy } from "../../dist/src/type/type.js"

import { object } from "../../dist/main.js"
const { kv, same, dekv, prototype, structCheck, keys, values } = object

const s = Symbol("R")
const subObject = { K: null }
const getObject = () => ({
	A: 10,
	[s]: true,
	T: subObject
})

const methFunction = () => console.log("rumpus")
const bs = Symbol("Nabe")

const getPrototypeObject = () => {
	const protoObj = {
		[bs]: "55",
		1919: "kr40al",
		meth: methFunction
	}
	Object.setPrototypeOf(protoObj, getObject())
	return protoObj
}

const kvTests = {
	own: [
		["A", "T", s],
		[10, subObject, true]
	],
	prototype: [
		["1919", "meth", "A", "T", bs, s],
		["kr40al", methFunction, 10, subObject, "55", true]
	]
}

suite("object", () => {
	test("kv", () => {
		assert(recursiveSame(kv(getObject()), kvTests.own))
		assert(recursiveSame(kv(getPrototypeObject()), kvTests.prototype))
	})

	test("dekv", () => {
		const object = getObject()
		const protoObj = getPrototypeObject()

		const reconstruct = (x: object) => dekv(kv(x))

		assert(same(reconstruct(object), object))
		assert(same(reconstruct(protoObj), protoObj))
		assert(!same(prototype(reconstruct(protoObj)), protoObj))
	})

	suite("structCheck", () => {
		const stringProps = ["rao", "word"]
		const symbolProps = ["s", "t"].map(Symbol)
		const [s, t] = symbolProps
		const shapeKeys = [...stringProps, ...symbolProps]
		const shapePredicates = [isNumber, isString, isArray, isTruthy] as ((
			x: any
		) => boolean)[]

		const shape_kv: KeyValues<(x: any) => boolean> = [shapeKeys, shapePredicates]
		const shapeObj = dekv(shape_kv)

		const meat = Symbol("meat")
		const optionalKeys = ["raaf", meat]

		const r = Symbol("r")
		const lackingProps = ["board", r]

		const getEmpty = () => ({})

		const getStructValid = () => ({
			rao: 22,
			[s]: [],
			[t]: 20,
			word: "Sairo"
		})

		const getStructInvalid = () => ({
			...getStructValid(),
			word: 22
		})

		const getStructExcessive = () => ({
			...getStructValid(),
			bb: 429
		})

		const getStructOptional = () => ({
			...getStructValid(),
			[meat]: true,
			raf: 17
		})

		const getStructViolating = () => ({
			...getStructValid(),
			board: 20,
			[r]: null
		})

		const emptyForbidding = (pred: (x: any) => boolean) => assert(!pred(getEmpty()))
		const emptyAllowing = (pred: (x: any) => boolean) => assert(pred(getEmpty()))
		const insufficientForbidding = (pred: (x: any) => boolean) => {
			assert(!pred({ [s]: [] }))
			assert(!pred({ [s]: [], [t]: 20 }))
			assert(!pred({ rao: 22 }))
		}

		const validAllowing = (pred: (x: any) => boolean) =>
			assert(pred(getStructValid()))

		const excessiveAllowing = (pred: (x: any) => boolean) =>
			assert(pred(getStructExcessive()))

		const excessiveForibidding = (pred: (x: any) => boolean) =>
			assert(!pred(getStructExcessive()))

		const invalidForbidding = (pred: (x: any) => boolean) =>
			assert(!pred(getStructInvalid()))

		const optionalAllowing = (pred: (x: any) => boolean) =>
			assert(!pred(getStructOptional()))

		const violatingForbidding = (pred: (x: any) => boolean) =>
			assert(!pred(getStructViolating()))

		const nonEmptyStrictTest = (nonEmptyStrict: (x: any) => boolean) => {
			emptyForbidding(nonEmptyStrict)
			insufficientForbidding(nonEmptyStrict)
			invalidForbidding(nonEmptyStrict)
			excessiveForibidding(nonEmptyStrict)
			validAllowing(nonEmptyStrict)
		}

		test("with empty structs [isStrict = false]", {}, () => {
			const [emptyStructArr, emptyStructObj] = [[], {}].map((x) => structCheck(x))

			const emptyTest = (emptyStruct: (x: any) => boolean) => {
				emptyAllowing(emptyStruct)
				assert(emptyStruct([]))
				assert(emptyStruct(new Set()))
				assert(emptyStruct({ K: "S", [Symbol.iterator]: function* () {} }))

				assert(!emptyStruct(null))
				assert(!emptyStruct(3))
				assert(!emptyStruct(true))
				assert(!emptyStruct(new Function()))
			}

			emptyTest(emptyStructArr)
			emptyTest(emptyStructObj)
		})

		test("with empty structs [isStrict = true, optional = []]", () => {
			const emptyStrict = structCheck({}, [], [], true)

			const emptyStrictTest = (emptyStrict: (x: any) => boolean) => {
				assert(!emptyStrict({ K: "S", R: 2 }))
				assert(!emptyStrict(null))
				assert(!emptyStrict(3))
				assert(!emptyStrict([]))
				assert(!emptyStrict(new Set()))

				emptyAllowing(emptyStrict)
			}

			emptyStrictTest(emptyStrict)
		})

		test("with empty structs [isStrict = true, optional != []]", () => {
			const emptyOptional = structCheck([], [], shapeKeys, true)

			const emptyOptionalTest = (emptyOptional: (x: any) => boolean) => {
				emptyAllowing(emptyOptional)
				validAllowing(emptyOptional)

				assert(emptyOptional({ rao: "" }))
				assert(emptyOptional({ [s]: 49 }))
				assert(!emptyOptional({ K: true }))
			}

			emptyOptionalTest(emptyOptional)
		})

		test("with empty structs [lacking != []]", () => {
			const emptyLacking = structCheck([], lackingProps)

			const emptyLackingTest = (emptyLacking: (x: any) => boolean) => {
				emptyAllowing(emptyLacking)
				assert(emptyLacking({ S: 70, K: 20 }))
				assert(!emptyLacking({ S: 70, [r]: 29 }))
				assert(!emptyLacking({ board: true }))
			}

			emptyLackingTest(emptyLacking)
		})

		test("with non-empty structs [isStrict = false]", () => {
			const nonEmptyStruct = structCheck(shapeObj)

			const nonEmptyStructTest = (nonEmptyStruct: (x: any) => boolean) => {
				emptyForbidding(nonEmptyStruct)
				insufficientForbidding(nonEmptyStruct)
				validAllowing(nonEmptyStruct)
				excessiveAllowing(nonEmptyStruct)
				invalidForbidding(nonEmptyStruct)
			}

			nonEmptyStructTest(nonEmptyStruct)
		})

		test("with non-empty structs [isStrict = true, optional = []]", () =>
			nonEmptyStrictTest(structCheck(shapeObj, [], [], true)))

		test("with non-empty structs [isStrict = true, optional != []]", () => {
			const nonEmptyOptional = structCheck(shapeObj, [], optionalKeys, true)

			const nonEmptyOptionalTest = (nonEmptyOptional: (x: any) => boolean) => {
				nonEmptyStrictTest(nonEmptyOptional)
				optionalAllowing(nonEmptyOptional)
			}

			nonEmptyOptionalTest(nonEmptyOptional)
		})

		test("with non-empty structs [lacking != []]", () => {
			const lackingNonEmpty = structCheck(shapeObj, lackingProps)
			const lackingNonEmptyTest = (lackingNonEmpty: (x: any) => boolean) => {
				emptyForbidding(lackingNonEmpty)
				insufficientForbidding(lackingNonEmpty)
				validAllowing(lackingNonEmpty)
				excessiveAllowing(lackingNonEmpty)
				violatingForbidding(lackingNonEmpty)
				invalidForbidding(lackingNonEmpty)
			}

			lackingNonEmptyTest(lackingNonEmpty)
		})
	})

	test("keys", () => {
		assert(same(keys(getObject()), kvTests.own[0]))
		assert(same(keys(getPrototypeObject()), kvTests.prototype[0]))
	})

	test("values", () => {
		assert(same(values(getObject()), kvTests.own[1]))
		assert(same(values(getPrototypeObject()), kvTests.prototype[1]))
	})
})
