import test, { suite } from "node:test"
import assert from "node:assert"

import { propertyDescriptors, type KeyValues } from "../../../dist/src/object/main.js"
import { isArray, isNumber, isString, isTruthy } from "../../../dist/src/type/type.js"
import {
	recursiveSame as array_recursiveSame,
	same as array_same
} from "../../../dist/src/array/array.js"

import { object } from "../../../dist/main.js"
import { withoutConstructor } from "../../../dist/src/object/classes.js"
const {
	kv,
	same,
	dekv,
	prototype,
	structCheck,
	keys,
	values,
	recursiveStringKeys,
	recursiveSymbolKeys,
	ownProperties,
	ownKeys,
	ownValues,
	copy,
	recursiveSame,
	withoutProperties,
	findOwnMissing,
	allocator,
	toMap
} = object

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
	],
	string: {
		own: [
			["A", "T"],
			[10, subObject]
		],
		prototype: [
			["1919", "meth", "A", "T"],
			["kr40al", methFunction, 10, subObject]
		]
	},
	symbol: {
		own: [[s], [true]],
		prototype: [
			[bs, s],
			["55", true]
		]
	},
	ownOnly: {
		prototype: [
			["1919", "meth", bs],
			["kr40al", methFunction, "55"]
		]
	}
}

suite("object", () => {
	test("kv", () => {
		assert(array_recursiveSame(kv(getObject()), kvTests.own))
		assert(array_recursiveSame(kv(getPrototypeObject()), kvTests.prototype))
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
		assert(array_same(keys(getObject()), kvTests.own[0]))
		assert(array_same(keys(getPrototypeObject()), kvTests.prototype[0]))
	})

	test("values", () => {
		assert(same(values(getObject()), kvTests.own[1]))
		assert(same(values(getPrototypeObject()), kvTests.prototype[1]))
	})

	test("recursiveStringKeys", () => {
		assert(array_same(recursiveStringKeys(getObject()), kvTests.string.own[0]))
		assert(
			array_same(
				recursiveStringKeys(getPrototypeObject()),
				kvTests.string.prototype[0]
			)
		)
	})

	test("recursiveSymbolKeys", () => {
		assert(array_same(recursiveSymbolKeys(getObject()), kvTests.symbol.own[0]))
		assert(
			array_same(
				recursiveSymbolKeys(getPrototypeObject()),
				kvTests.symbol.prototype[0]
			)
		)
	})

	test("ownProperties", () => {
		assert(array_recursiveSame(ownProperties(getObject()), kvTests.own))
		assert(
			array_recursiveSame(
				ownProperties(getPrototypeObject()),
				kvTests.ownOnly.prototype
			)
		)
	})

	test("ownKeys", () => {
		assert(array_same(ownKeys(getObject()), kvTests.own[0]))
		assert(array_same(ownKeys(getPrototypeObject()), kvTests.ownOnly.prototype[0]))
	})

	test("ownValues", () => {
		assert(array_same(ownValues(getObject()), kvTests.own[1]))
		assert(array_same(ownValues(getPrototypeObject()), kvTests.ownOnly.prototype[1]))
	})

	test("copy", () => {
		const X = getObject()
		assert.notStrictEqual(copy(X), X)
		assert(same(copy(X), X))
	})

	suite("propertyDescriptors", () => {
		const method = function () {
			return true
		}
		const propDescSimple = {
			method: { value: method, writable: true },
			X: { value: 99 }
		}

		const expectedRetained = {
			X: {
				value: 99,
				writable: false,
				enumerable: false,
				configurable: false
			}
		}

		const expectedDescSimple = {
			method: {
				value: method,
				writable: true,
				enumerable: false,
				configurable: false
			},
			...expectedRetained
		}

		class T {}
		Object.defineProperties(T.prototype, propDescSimple)

		test("simple case", () =>
			assert(
				recursiveSame(
					withoutConstructor(propertyDescriptors(T.prototype)),
					expectedDescSimple
				)
			))

		const method2 = function () {
			return 1911
		}
		const s99 = Symbol("99")
		const propsAddition = {
			method: { value: method2 },
			L: { value: s99 }
		}

		const overridenPortion = {
			method: {
				value: method2,
				writable: false,
				enumerable: false,
				configurable: false
			}
		}

		const expectedPropsAddition = {
			L: {
				value: s99,
				writable: false,
				enumerable: false,
				configurable: false
			}
		}

		const expectedNewDescriptors = {
			...overridenPortion,
			...expectedPropsAddition,
			...expectedRetained
		}

		class R extends T {}
		Object.defineProperties(R.prototype, propsAddition)

		test("recursive case", () =>
			assert(
				recursiveSame(
					withoutConstructor(propertyDescriptors(R.prototype)),
					expectedNewDescriptors
				)
			))
	})

	test("findOwnMissing", () => {
		const iterator = function* () {}
		assert(
			same(
				findOwnMissing(getObject(), {
					A: "17",
					B: false,
					[Symbol.iterator]: iterator,
					[s]: 11
				}),
				{
					B: false,
					[Symbol.iterator]: iterator
				}
			)
		)
	})

	test("allocator", () => {
		const X = getObject()
		const alloc_obj = allocator(X)

		assert(same(alloc_obj(), X))
		assert(recursiveSame(alloc_obj(), X))
		assert.notStrictEqual(alloc_obj(), X)
		assert.notStrictEqual(alloc_obj(), alloc_obj())
	})

	test("same", () => {
		const X = getObject()
		assert(same(X, getObject()))
		assert(same(X, X))

		const numObject = {
			x: 1,
			y: 20,
			z: 47
		}

		const squareObject = {
			x: 1,
			y: 400,
			z: 2209
		}

		const nonSquareObject = {
			y: 400,
			z: 2209,
			x: 1
		}

		const firstSquared = (x: number, y: number) => x ** 2 === y

		assert(same(numObject, squareObject, firstSquared))
		assert(!same(numObject, nonSquareObject, firstSquared))
	})

	test("toMap", () => {
		const X = getObject()
		const map = toMap(X)
		assert(array_same([...map.keys()], keys(X)))
		assert(array_same([...map.values()], values(X)))
	})

	test("recursiveSame", () => {
		const X = getObject()
		assert(recursiveSame(getObject(), X))
		assert(recursiveSame(X, X))

		const numObject = {
			s: {
				b: 40,
				r: 90,
				l: {
					m: 3
				}
			},
			k: 7
		}

		const addObject = {
			s: {
				b: 43,
				r: 93,
				l: {
					m: 6
				}
			},
			k: 10
		}

		const nonAddObject1 = {
			k: 10,
			s: {
				b: 43,
				r: 93,
				l: {
					m: 6
				}
			}
		}

		const nonAddObject2 = {
			k: 10,
			s: {
				b: 43,
				r: 93,
				l: {}
			}
		}

		const addedThree = (x: number, y: number) => x + 3 === y

		assert(recursiveSame(numObject, addObject, addedThree))
		assert(!recursiveSame(numObject, nonAddObject1, addedThree))
		assert(!recursiveSame(numObject, nonAddObject2, addedThree))
	})

	test("withoutProperties", () => {
		const withObj = {
			R: 90,
			C: 20,
			[s]: 440,
			N: "Ah?",
			[bs]: "T"
		}

		const sans = withoutProperties("A", s, "B", "C")

		assert(same(sans(withObj), { R: 90, N: "Ah?", [bs]: "T" }))
		assert.notStrictEqual(sans(withObj), withObj)
	})
})
