import {
	deepSearch,
	depth,
	levelCount,
	recursiveIndexation,
	treeCount,
	treeFlatten,
	treeReverseLR
} from "../src/trees/trees.mjs"

// * 'depth'
console.log(depth([["hello!"], [[[4431]]], "19"]))
console.log(depth([]))
console.log()

// * 'treeFlatten'
console.log(treeFlatten([["hello!"], [[[4431]]], "19"]))
console.log(treeFlatten([]))
console.log()

// * 'recursiveIndexation'
console.log(recursiveIndexation([["hello!"], [[[4431]]], "19"], [0, 0]))
console.log(recursiveIndexation([["hello!"], [[[4431]]], "19"], [1, 0, 0, 0]))
console.log(recursiveIndexation([["hello!"], [[[4431]]], "19"], [2]))
console.log()

// * 'treeCount'
console.log(treeCount([["hello!"], [[[4431]]], "19"], (x) => typeof x === "string"))
console.log(
	treeCount([[9910, 909085], [[[4431, -7, -99907]]], 3, 34, 234, [[1094, 20], 623]])
)
console.log(treeCount(["abaaba", ["kafkak", "kakakakakakararararara"]], (x) => x, ""))
console.log()

// * 'levelCount'
console.log(levelCount([[[443]], "kklsa", [[[]]]]))
console.log(levelCount([]))
console.log()

// * 'deepSearch'
console.log(deepSearch([["hello!"], [[[4431]]], "19"], (x) => typeof x === "number"))
console.log()

// * 'treeReverseLR'
console.log(
	treeReverseLR([
		"79S",
		[[[["Saari", "K"], "oopop"], "LUPO"]],
		["ESQ.", [[3277], 9098, 90251, 3213, "SIEGBRAU", false, [true, [97]]]],
		[999, 23]
	])
)
