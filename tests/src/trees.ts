import {
	deepSearch,
	depth,
	levelCount,
	recursiveIndexation,
	treeCount,
	treeReverseLR,
	type ArrayTree
} from "../../dist/src/trees/trees.js"

// * 'depth'
console.log(depth([["hello!"], [[[4431]]], "19"] as ArrayTree<any>))
console.log(depth([]))
console.log()

// * 'recursiveIndexation'
console.log(recursiveIndexation([["hello!"], [[[4431]]], "19"] as ArrayTree<any>, [0, 0]))
console.log(
	recursiveIndexation([["hello!"], [[[4431]]], "19"] as ArrayTree<any>, [1, 0, 0, 0])
)
console.log(recursiveIndexation([["hello!"], [[[4431]]], "19"] as ArrayTree<any>, [2]))
console.log()

// * 'treeCount'
console.log(
	treeCount(
		[["hello!"], [[[4431]]], "19"] as ArrayTree<any>,
		(x) => typeof x === "string"
	)
)
console.log(
	treeCount([[9910, 909085], [[[4431, -7, -99907]]], 3, 34, 234, [[1094, 20], 623]])
)
console.log(treeCount(["abaaba", ["kafkak", "kakakakakakararararara"]], (x) => x, ""))
console.log()

// * 'levelCount'
console.log(levelCount([[[443]], "kklsa", [[[]]]] as ArrayTree<any>))
console.log(levelCount([]))
console.log()

// * 'deepSearch'
console.log(
	deepSearch(
		[["hello!"], [[[4431]]], "19"] as ArrayTree<any>,
		(x) => typeof x === "number"
	)
)
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
