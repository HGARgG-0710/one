import assert from "node:assert"
import test, { suite } from "node:test"

import {
	recursiveSame as array_recursiveSame,
	same as array_same,
} from "../../../dist/src/array/array.js"
import { propDefine } from "../../../dist/src/object/main.js"
import {
	isArray,
	isNull,
	isNumber,
	isString,
	isTruthy,
	verifyConstructor,
} from "../../../dist/src/types/types.js"

import { object, testing } from "../../../dist/main.js"
import { argWaster } from "../../../dist/src/functional/functional.js"
import { isEven, sum } from "../../../dist/src/number/number.js"

const { assertThrows } = testing
const {
	kv,
	same,
	dekv,
	prototype,
	keys,
	values,
	recursiveStringKeys,
	recursiveSymbolKeys,
	ownProperties,
	ownKeys,
	copy,
	recursiveSame,
	withoutProperties,
	getOwnMissing,
	allocator,
	toMap,
	prop,
	protoProp,
	extendPrototype,
	propertyDescriptors,
	recursiveIterate,
	Shape,
	descriptor,
} = object

const {
	classWrapper,
	withoutConstructor,
	mixin,
	delegateMethod,
	delegateGetter,
	applyDelegate,
	attachConst,
	attachGetter,
} = object.classes

const s1 = Symbol("R")
const subObject = { K: null }
const getObject = () => ({
	A: 10,
	[s1]: true,
	T: subObject,
})

const methFunction = () => console.log("rumpus")
const s2 = Symbol("Nabe")

const getPrototypeObject = () => {
	const target = {
		[s2]: "55",
		1919: "kr40al",
		meth: methFunction,
	}
	const proto = getObject()
	Object.setPrototypeOf(proto, {})
	Object.setPrototypeOf(target, proto)
	return target
}

const kvTests: any = {
	own: [
		["A", "T", s1],
		[10, subObject, true],
	],
	prototype: [
		["1919", "meth", "A", "T", s2, s1],
		["kr40al", methFunction, 10, subObject, "55", true],
	],
	string: {
		own: [
			["A", "T"],
			[10, subObject],
		],
		prototype: [
			["1919", "meth", "A", "T"],
			["kr40al", methFunction, 10, subObject],
		],
	},
	symbol: {
		own: [[s1], [true]],
		prototype: [
			[s2, s1],
			["55", true],
		],
	},
	ownOnly: {
		prototype: [
			["1919", "meth", s2],
			["kr40al", methFunction, "55"],
		],
	},
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

	suite("Shape", () => {
		test("empty [isStrict = false]", {}, () => {
			const emptyShape = new Shape.Builder().build()
			const emptyTest = (emptyStruct: (x: any) => boolean) => {
				assert(emptyStruct({}))
				assert(emptyStruct([]))
				assert(emptyStruct(new Set()))
				assert(emptyStruct({ K: "S", [Symbol.iterator]: function* () {} }))
				assert(!emptyStruct(null))
				assert(!emptyStruct(3))
				assert(!emptyStruct(true))
				assert(!emptyStruct(new Function()))
			}
			emptyTest(emptyShape.asPredicate())
		})

		test("empty [isStrict = true, optional = []]", () => {
			const emptyStrictShape = new Shape.Builder().makeStrict().build()
			const emptyStrictTest = (emptyStrict: (x: any) => boolean) => {
				assert(!emptyStrict({ K: "S", R: 2 }))
				assert(!emptyStrict(null))
				assert(!emptyStrict(3))
				assert(!emptyStrict([]))
				assert(!emptyStrict(new Set()))
				assert(emptyStrict({}))
			}
			emptyStrictTest(emptyStrictShape.asPredicate())
		})

		test("empty [isStrict = true, optional != []]", () => {
			interface I {
				a?: any
				[s1]: any
			}

			const emptyOptional = new Shape.Builder<I>()
				.makeStrict()
				.optional("a")
				.optional(s1)
				.build()

			const emptyOptionalTest = (emptyOptional: (x: any) => boolean) => {
				assert(emptyOptional({}))
				assert(emptyOptional({ a: "" }))
				assert(emptyOptional({ [s1]: 49 }))
				assert(!emptyOptional({ K: true }))
				assert(!emptyOptional({ a: 11, K: true }))
			}

			emptyOptionalTest(emptyOptional.asPredicate())
		})

		test("empty [isStrict = false, lacking != []]", () => {
			const emptyLacking = new Shape.Builder().remove("a").remove(s1).build()
			const emptyLackingTest = (emptyNeg: (x: any) => boolean) => {
				assert(emptyNeg({}))
				assert(emptyNeg({ S: 70, [s2]: 29 }))
				assert(!emptyNeg({ S: 70, [s1]: 20 }))
				assert(!emptyNeg({ a: true }))
			}
			emptyLackingTest(emptyLacking.asPredicate())
		})

		test("non-empty [isStrict = false]", () => {
			const nonEmpty = new Shape.Builder().add("a").add(s2, isNull).build()
			const nonEmptyTest = (nonEmpty: (x: any) => boolean) => {
				assert(!nonEmpty({}))
				assert(!nonEmpty({ a: 1 }))
				assert(nonEmpty({ a: 1, [s2]: null }))
				assert(nonEmpty({ a: false, [s2]: null, b: 43 }))
				assert(nonEmpty({ a: "", [s2]: null }))
				assert(nonEmpty({ a: {}, [s2]: null }))
				assert(nonEmpty({ a: null, [s2]: null }))
				assert(nonEmpty({ a: undefined, [s2]: null }))
				assert(!nonEmpty({ a: undefined, [s2]: 5 }))
			}
			nonEmptyTest(nonEmpty.asPredicate())
		})

		test("non-empty [isStrict = true, optional = []]", () => {
			const shape = new Shape.Builder()
				.add("a", isNumber)
				.add(s2, isTruthy)
				.makeStrict()
				.build()

			const nonEmptyStrictTest = (nonEmptyStrict: (x: any) => boolean) => {
				assert(!nonEmptyStrict({}))
				assert(!nonEmptyStrict({ a: 3 }))
				assert(!nonEmptyStrict({ a: 3, [s2]: 0 }))
				assert(!nonEmptyStrict({ a: 3, [s2]: 1, K: "" }))
				assert(nonEmptyStrict({ a: 3, [s2]: 1 }))
			}

			nonEmptyStrictTest(shape.asPredicate())
		})

		test("non-empty [isStrict = true, optional != []]", () => {
			const shape = new Shape.Builder()
				.add("b", isArray)
				.add(s1, (x) => isNumber(x) && isEven(x))
				.makeStrict()
				.optional("l")
				.optional(s1)
				.build()

			const strictOptionalTest = (shapePred: (x: any) => boolean) => {
				assert(!shapePred({}))
				assert(!shapePred({ b: [] }))
				assert(!shapePred({ b: [], [s1]: 1 }))
				assert(!shapePred({ b: 3, [s1]: 1, K: "" }))
				assert(shapePred({ b: [], [s1]: 2 }))
			}

			strictOptionalTest(shape.asPredicate())
		})

		test("non-empty [isStrict = false, lacking != []]", () => {
			const shape = new Shape.Builder()
				.add("a", isString)
				.add("b")
				.remove("abc")
				.build()

			const lackingShapeTest = (shapePred: (x: any) => boolean) => {
				assert(!shapePred({}))
				assert(!shapePred({ a: "" }))
				assert(!shapePred({ a: 1, b: null }))
				assert(!shapePred({ a: "", b: null, R: true, abc: 10 }))
				assert(shapePred({ a: "", b: null }))
				assert(shapePred({ a: "", b: null, R: true }))
			}

			lackingShapeTest(shape.asPredicate())
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
				kvTests.string.prototype[0],
			),
		)
	})

	test("recursiveSymbolKeys", () => {
		assert(array_same(recursiveSymbolKeys(getObject()), kvTests.symbol.own[0]))
		assert(
			array_same(
				recursiveSymbolKeys(getPrototypeObject()),
				kvTests.symbol.prototype[0],
			),
		)
	})

	test("recursiveIterate", () => {
		const x = {
			ijk: "",
			lmnop: "",
		}
		const proto2 = { qrs: "", tuvw: "", xy: "", z: "" }
		const proto1 = { a: "", bcd: "", efgh: "" }
		Object.setPrototypeOf(proto1, proto2)
		Object.setPrototypeOf(x, proto1)

		const propLengths = recursiveIterate(
			x,
			(proto) =>
				Object.getOwnPropertyNames(proto).map((keyName) => keyName.length),
			false,
		)

		assert.strictEqual(sum(...propLengths), 26)
		assert(same(propLengths, [3, 5, 1, 3, 4, 3, 4, 2, 1]))
	})

	test("ownProperties", () => {
		assert(array_recursiveSame(ownProperties(getObject()), kvTests.own))
		assert(
			array_recursiveSame(
				ownProperties(getPrototypeObject()),
				kvTests.ownOnly.prototype,
			),
		)
	})

	test("ownKeys", () => {
		assert(array_same(ownKeys(getObject()), kvTests.own[0]))
		assert(
			array_same(ownKeys(getPrototypeObject()), kvTests.ownOnly.prototype[0]),
		)
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
			X: { value: 99 },
		}

		const expectedRetained = {
			X: {
				value: 99,
				writable: false,
				enumerable: false,
				configurable: false,
			},
		}

		const expectedDescSimple = {
			method: {
				value: method,
				writable: true,
				enumerable: false,
				configurable: false,
			},
			...expectedRetained,
		}

		class T {}
		Object.defineProperties(T.prototype, propDescSimple)

		test("simple case", () =>
			assert(
				recursiveSame(
					withoutConstructor(propertyDescriptors(T.prototype)),
					expectedDescSimple,
				),
			))

		const method2 = function () {
			return 1911
		}
		const s99 = Symbol("99")
		const propsAddition = {
			method: { value: method2 },
			L: { value: s99 },
		}

		const overridenPortion = {
			method: {
				value: method2,
				writable: false,
				enumerable: false,
				configurable: false,
			},
		}

		const expectedPropsAddition = {
			L: {
				value: s99,
				writable: false,
				enumerable: false,
				configurable: false,
			},
		}

		const expectedNewDescriptors = {
			...overridenPortion,
			...expectedPropsAddition,
			...expectedRetained,
		}

		class R extends T {}
		Object.defineProperties(R.prototype, propsAddition)

		test("recursive case", () =>
			assert(
				recursiveSame(
					withoutConstructor(propertyDescriptors(R.prototype)),
					expectedNewDescriptors,
				),
			))
	})

	test("getOwnMissing", () => {
		const iterator = function* () {}
		assert(
			same(
				getOwnMissing(getObject(), {
					A: "17",
					B: false,
					[Symbol.iterator]: iterator,
					[s1]: 11,
				}),
				{
					B: false,
					[Symbol.iterator]: iterator,
				},
			),
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
			z: 47,
		}

		const squareObject = {
			x: 1,
			y: 400,
			z: 2209,
		}

		const nonSquareObject = {
			y: 400,
			z: 2209,
			x: 1,
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
					m: 3,
				},
			},
			k: 7,
		}

		const addObject = {
			s: {
				b: 43,
				r: 93,
				l: {
					m: 6,
				},
			},
			k: 10,
		}

		const nonAddObject1 = {
			k: 10,
			s: {
				b: 43,
				r: 93,
				l: {
					m: 6,
				},
			},
		}

		const nonAddObject2 = {
			k: 10,
			s: {
				b: 43,
				r: 93,
				l: {},
			},
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
			[s1]: 440,
			N: "Ah?",
			[s2]: "T",
		}

		const sans = withoutProperties("A", s1, "B", "C")

		assert(same(sans(withObj), { R: 90, N: "Ah?", [s2]: "T" }))
		assert.notStrictEqual(sans(withObj), withObj)
	})

	test("prop", () => {
		assert.strictEqual(prop("x")({ y: 23, x: 17 }), 17)
	})

	test("protoProp", () => {
		class C {}

		const cPre = new C() as { soon?: any }
		protoProp(C, "soon", { value: true })
		const cPost = new C() as { soon: boolean }

		assert.strictEqual(cPre.soon, cPost.soon)
		assert.strictEqual(cPre.soon, true)
		assert.strictEqual(prototype(cPre), prototype(cPost))
	})

	test("extendPrototype", () => {
		class C {
			k = 0
		}

		interface D {
			k: number
			d: number
			readonly c: number
		}

		const c1 = new C() as D
		const c2 = new C() as D

		extendPrototype(C, {
			c: { value: 17 },
			d: {
				set: function () {
					++this.k
				},
				get: function () {
					return this.k - 11
				},
			},
		})

		c1.d = 10
		c1.d = 27
		c1.d = 19

		assert.strictEqual(c1.d, -8)
		assert.strictEqual(c2.d, -11)
		assert.strictEqual(c1.c, c2.c)
	})

	suite("classes", () => {
		test("classWrapper", () => {
			class C {
				k: number
				constructor(k = 17) {
					this.k = k
				}
			}

			const t = argWaster(1)(classWrapper(C)) as (...args: any[]) => C

			const c = t()
			const c1 = t(11)

			assert.strictEqual(c.k, 17)
			assert.strictEqual(c1.k, 17)
		})

		test("withoutConstructor", () => {
			const C = { constructor: function () {} }
			assert.strictEqual(withoutConstructor(C).constructor, Object)
		})

		test("mixin", () => {
			class C {
				constructor(public r: number) {}
			}

			class D {
				constructor() {}
				meth1() {}
				meth2() {}
				meth3() {}
				meth4() {}
			}

			class E {
				meth1() {}
			}

			class F {
				x: number
				constructor(x: number) {
					this.x = 90 + x
				}
				meth3() {}
			}

			mixin(C, [D, E, F])

			const c = new C(3) as {
				r: number
				meth1(): any
				meth2(): any
				meth3(): any
				meth4(): any
			}

			assert.strictEqual(c.r, 3)
			assert.strictEqual(c.meth1, E.prototype.meth1)
			assert.strictEqual(c.meth2, D.prototype.meth2)
			assert.strictEqual(c.meth3, F.prototype.meth3)
			assert.strictEqual(c.meth4, D.prototype.meth4)
		})

		test("delegateMethod", () => {
			class B {
				constructor(public r: number = 11) {}

				meth1(x: number) {
					return this.r * x
				}
			}

			class C {
				constructor(public b: B) {}
			}

			const b = new B()
			const c = new C(b)
			const callDelegate = delegateMethod("b")("meth1").bind(c)

			assert.strictEqual(callDelegate(3), 33)
			assert.strictEqual(callDelegate(9), 99)

			b.r = 2
			assert.strictEqual(callDelegate(2), 4)
		})

		test("delegateProperty", () => {
			class B {
				constructor(public r: number) {}
			}

			class C {
				constructor(public b: B) {}
			}

			const b = new B(13)
			const c = new C(b)

			const getProperty = delegateGetter("b")("r").bind(c)
			assert.strictEqual(getProperty(), 13)

			b.r = 1119
			assert.strictEqual(getProperty(), 1119)
		})

		test("calledDelegate", () => {
			class B {
				constructor(public r: number) {}
				meth1(x: number) {
					return this.r * x
				}
			}

			class C {
				constructor(
					public b: B,
					public r: number,
				) {}
			}

			const b1 = new B(7)
			const c1 = new C(b1, 5)

			const b2 = new B(4)
			const c2 = new C(b2, 3)

			const callDelegate = applyDelegate("b")("meth1")

			assert.strictEqual(callDelegate(c1, [3]), 15)
			assert.strictEqual(callDelegate(c2, [3]), 9)
		})

		test("attachGetter", () => {
			function f(a: any) {
				a.a = 11
			}

			interface AObj {
				readonly a: number
			}

			const get = () => 10
			function _A() {}
			const A = verifyConstructor<AObj>(_A)
			attachGetter(A, "a", get)

			const a = new A()
			assert.strictEqual(a.a, 10)
			assertThrows(() => f(a))
			assert.strictEqual(a.a, 10)
		})

		test("attachConst", () => {
			interface AObj {
				readonly a: number
			}

			function f(a: any) {
				a.a = 11
			}

			function _A() {}
			const A = verifyConstructor<AObj>(_A)
			attachConst(A, "a", 10)

			const a = new A()
			assert.strictEqual(a.a, 10)
			assertThrows(() => f(a))
			assert.strictEqual(a.a, 10)
		})
	})

	suite("descriptor", () => {
		test("Value", () => {
			const desc = descriptor.Value(10)
			const a: any = { b: 11 }
			propDefine(a, "a", desc)

			assert.strictEqual(a.a, 10)
			assert.strictEqual(a.b, 11)

			a.b = 12

			assertThrows(() => (a.a = 11))
			assert.strictEqual(a.b, 12)
			assert.strictEqual(a.a, 10)
		})

		test("Enumerable", () => {
			const desc1 = descriptor.Value(11)
			const desc2 = {
				...descriptor.Value(12),
				...descriptor.Enumerable(),
			}

			interface C {
				readonly b: number
				readonly a?: number
				readonly c?: number
			}

			const a: C = { b: 11 }
			propDefine(a, "a", desc1)
			propDefine(a, "c", desc2)

			assert(!a.propertyIsEnumerable("a"))
			assert(a.propertyIsEnumerable("b"))
			assert(a.propertyIsEnumerable("c"))

			const props: string[] = []
			for (const p in a) props.push(p)
			assert(array_same(props, ["b", "c"]))
		})

		test("Getter", () => {
			const desc = descriptor.Getter(function () {
				return Math.sqrt(this.x ** 2 + this.y ** 2)
			})

			interface Point {
				readonly x: number
				readonly y: number
				readonly diagonal?: number
			}

			const point: Point = {
				x: 13,
				y: 84,
			}

			propDefine(point, "diagonal", desc)
			assert.strictEqual(point.diagonal, 85)
			assertThrows(() => ((point as any).diagonal = () => 0))
		})

		test("Setter", () => {
			const desc = descriptor.Setter(function (y: number) {
				this._a += y
				this.y = y
			})

			interface A {
				a?: number
				readonly _a?: number
				readonly y: number
			}

			const obj: A = {
				_a: 10,
				y: 0,
			}

			propDefine(obj, "a", desc)
			assert.strictEqual(obj._a, 10)

			obj.a = 3
			assert.strictEqual(obj._a, 13)
			assert.strictEqual(obj.y, 3)
		})

		test("Writable", () => {
			interface A {
				a?: number
				readonly b?: number
			}

			const a: A = {}

			propDefine(a, "a", { ...descriptor.Writable(), ...descriptor.Value(10) })
			propDefine(a, "b", descriptor.Value(10))

			assert.strictEqual(a.a, 10)
			assert.strictEqual(a.b, 10)

			a.a = 0
			assert.strictEqual(a.a, 0)
			assertThrows(() => ((a as any).b = 0))
		})

		test("Configurable", () => {
			const desc1 = {
				...descriptor.Configurable(),
				...descriptor.Value(11),
			}

			const desc2 = {
				...descriptor.Value(13),
			}

			interface A {
				a?: number
				c?: number
				b: number
			}

			const a: A = { b: 10 }
			propDefine(a, "a", desc1)
			propDefine(a, "c", desc2)

			function replacePropWithGetSet(target: any, propName: PropertyKey) {
				propDefine(target, propName, {
					...descriptor.Getter(function () {
						return this.b + 3
					}),
					...descriptor.Setter(function (b: number) {
						this.b = b - 3
					}),
				})
			}

			assertThrows(() => replacePropWithGetSet(a, "c"))
			replacePropWithGetSet(a, "a")
			assert.strictEqual(a.b, 10)
			assert.strictEqual(a.a, 13)
			a.a = 44
			assert.strictEqual(a.a, 44)
			assert.strictEqual(a.b, 41)
		})
	})
})
