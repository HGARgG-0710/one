import {
	deepSearch,
	depth,
	levelCount,
	recursiveIndexation,
	treeCount,
	treeReverse,
	type ArrayTree
} from "../../dist/src/trees/trees.js"
import { isNumber, isString } from "../../dist/src/typeof/typeof.js"

const testTree: ArrayTree<any> = [["hello!"], [[[4431]]], "19"]

// * 'depth'
console.log(depth(testTree))
console.log(depth([]))
console.log()

// * 'recursiveIndexation'
console.log(recursiveIndexation(testTree, [0, 0]))
console.log(recursiveIndexation(testTree, [1, 0, 0, 0]))
console.log(recursiveIndexation(testTree, [2]))
console.log()

// * 'treeCount'
console.log(treeCount(testTree, isString))
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
console.log(deepSearch(testTree, isNumber))
console.log()

// * 'treeReverse'
console.log(
	treeReverse([
		"79S",
		[[[["Saari", "K"], "oopop"], "LUPO"]],
		["ESQ.", [[3277], 9098, 90251, 3213, "SIEGBRAU", false, [true, [97]]]],
		[999, 23]
	])
)
