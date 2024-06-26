import { kv, dekv, structCheck, toMap } from "../src/objects/objects.mjs"

// * 'kv'
console.log(kv({ a: "T", [Symbol("c")]: "K", 0: 4 }))
console.log(kv({}))
console.log()

// * 'dekv'
console.log(dekv(kv({ a: "T", [Symbol("c")]: "K", 0: 4 })))
console.log(dekv(kv({})))
console.log()

// * 'structCheck'
const check = structCheck("A", "B", "D", ["kar"])
console.log(check({ A: 33, D: 334, C: 23 }))
console.log(check(2))
console.log(check(null))
console.log(check({ A: 343, B: undefined, D: 88, kar: null }))
console.log()

// * 'toMap'
const obj = { x: 909, 123: true, f: function () {} }
console.log(obj)
console.log(toMap(obj))
