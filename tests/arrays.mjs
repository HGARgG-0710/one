import { lastOut, last, clear, insert, replace, out, swapped } from "../src/arrays.mjs"

// * lastOut
console.log(
	lastOut(
		lastOut(["Artorias", "Gwyn", "Four Kings", "Nito", "Bed of Chaos", "Kapra Demon"])
	)
)
console.log(lastOut([]))
console.log()

// * 'last'
console.log(
	last([
		"BABABA",
		"It's all a load of nonsense, really",
		"...",
		"...?",
		"I'm supposed to be picked!"
	])
)
console.log(last([]))
console.log()

// * 'clear'

const t = ["AAAAAAAAAAAAAAAAA", "WE'RE GOING TO DIEEEEIEIEIEIEIE!", "whatevers..."]
clear(t)
console.log(t)

const r = []
clear(r)
console.log(r)
console.log()

// * 'insert'

console.log(insert(["jujuju", "fafafa", "rarirurirurira"], 2, true))

// * 'replace'

console.log(replace(["a", false, null], 1, "kklklkl", null, null, null, true))
console.log()

// * 'out'
console.log(out(["a", false, "b"], 1))
console.log()

// * swapped
console.log(swapped(["a", "b", "c"], 0, 2))
console.log(swapped(["a", "b", "c"], 2, 0))
console.log(swapped(["a", "b", "c"], 2, 1))
