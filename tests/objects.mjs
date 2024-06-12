import { kv, dekv, structCheck } from "../src/objects.mjs"

// * 'kv'
console.log(kv({ a: "T", [Symbol("c")]: "K", 0: 4 }))
console.log(kv({}))
console.log()

// * 'dekv'
console.log(dekv(kv({ a: "T", [Symbol("c")]: "K", 0: 4 })))
console.log(dekv(kv({})))
console.log()

// * 'structObject'
const check = structCheck(["A", "B", "D"])
console.log(check({ A: 33, D: 334, C: 23 }))
console.log(check(2))
console.log(check(null))
console.log(check({ A: 343, B: undefined, D: 88 }))
