import {
	lastOut,
	last,
	clear,
	insert,
	replace,
	out,
	firstOut,
	first,
	propPreserve,
	middleOutN,
	middleOutP,
	filter,
	map,
	copy,
	reduce,
	reduceRight
} from "../../dist/src/arrays/arrays.js"

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

console.log(insert<any>(["jujuju", "fafafa", "rarirurirurira"], 2, true))
console.log()

// * 'replace'

console.log(replace(["a", false, null], 1, "kklklkl", null, null, null, true))
console.log()

// * 'out'
console.log(out(["a", false, "b"], 1))
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
const propCheck = propPreserve((x: any[]) => x.map((x) => x + 3))
const _t: { [x: string]: any } & any[] = [0, 2, 3, 5]
_t.S = 333
const _tPlus = propCheck(_t)
console.log(_tPlus)
console.log(_t === _tPlus)

console.log()

// * 'middleOutN' and  'middleOutP'

console.log(middleOutN([0, 1, 2, 3, 4, 5, 6, 7, 8]))
console.log(middleOutN([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
console.log(middleOutP([0, 1, 2, 3, 4, 5, 6, 7, 8]))
console.log(middleOutP([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
console.log()

// * 'filter'
const origFilter = [0, 1345, 0.32, 0.97, 0.551, 0.41]
const filtered = filter(origFilter, (x: number) => x < 0.5)
console.log(filtered)
console.log(filtered === origFilter)
console.log()

// * 'map'
const origMap = [1, 22, 90, 5190]
const mapped = map(origMap, (x: number) => (x < 100 ? x ** x : x ** 2))
console.log(mapped)
console.log(origMap === mapped)
console.log()

// * 'copy'
console.log(copy(origFilter) === origFilter)
console.log(copy(origFilter))
console.log()

// * 'reduce'
console.log(
	reduce(
		origFilter,
		(lastArr: number[], y) => {
			lastArr.push(reduce(lastArr, (x: number, y: number) => x + y, 0) + y)
			return lastArr
		},
		[]
	)
)
console.log()

// * 'reduceRight'
console.log(
	reduceRight(
		origFilter,
		(x: number[], y: any) => {
			x.push(y)
			return x
		},
		[]
	)
)
