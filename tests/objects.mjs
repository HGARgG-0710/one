import { kv, dekv } from "../src/objects.mjs"

// * 'kv'
console.log(kv({ a: "T", [Symbol("c")]: "K", 0: 4 }))
console.log(kv({}))
console.log()

// * 'dekv'
console.log(dekv(kv({ a: "T", [Symbol("c")]: "K", 0: 4 })))
console.log(dekv(kv({})))
console.log()
