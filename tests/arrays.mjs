import {
	lastOut,
	last,
	clear,
	insert,
	replace,
	out,
	swapped,
	firstOut,
	first,
	propPreserve,
	iterator,
	middleOutN,
	middleOutP
} from "../src/arrays/arrays.mjs"

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

console.log()

// * 'firstOut'
console.log(
	firstOut([
		"TARTAR",
		"You know, if not for the zeroth one, all'd be well!",
		"I second that!"
	])
)
console.log(firstOut([]))

console.log()

// * 'first'
console.log(first([888, 0, 1, 2, 3]))
console.log(first([]))

console.log()

// * 'propPreserve'
const propCheck = propPreserve((x) => x.map((x) => x + 3))
const _t = [0, 2, 3, 5]
_t.S = 333
const _tPlus = propCheck(_t)
console.log(_tPlus)
console.log(_t === _tPlus)

console.log()

// * 'iterator'

const A = { [Symbol.iterator]: iterator([393920, 109098, "STIRNG!"]) }
console.log(...A)
console.log()

// * 'middleOutN' and  'middleOutP'

console.log(middleOutN([0, 1, 2, 3, 4, 5, 6, 7, 8]))
console.log(middleOutN([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
console.log(middleOutP([0, 1, 2, 3, 4, 5, 6, 7, 8]))
console.log(middleOutP([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
