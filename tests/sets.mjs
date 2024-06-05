import { norepetitions, same } from "../src/sets.mjs"

// * 'same'
console.log(same(new Set(["aaa", "bacae"]), new Set(["bacae", "aaa"])))
console.log(same(new Set(["aa", "bacae"]), new Set(["bacae", "aaa"])))

// * 'norepetitions'
console.log(norepetitions(["aa", "aa", 11, 432, 11, 4523, 432, 11, "ab"]))
console.log(norepetitions(["bbb", "b2"]))
