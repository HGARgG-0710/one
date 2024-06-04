// * Methods for working with array trees;

import { lastOut } from "./arrays.mjs"

export const depth = (tree) =>
	((x) => x * (1 + Math.max(...tree.map(depth))))(tree instanceof Array)

export const treeFlatten = (tree) =>
	tree.some((x) => x instanceof Array) ? treeFlatten(tree.flat()) : tree

export const recursiveIndexation = (tree, multind) =>
	multind.reduce((acc, curr) => acc[curr], tree)

export const recursiveSetting = (tree, multind, value) =>
	(recursiveIndexation(tree, lastOut(multind))[last(multind)] = value)

export const treeCount = (tree, prop) =>
	tree
		.map((x) => (x instanceof Array ? treeCount : prop)(x))
		.reduce((sum, summand) => sum + summand, 0)

export const deepSearch = (tree, prop) =>
	tree.reduce(
		(prev, curr, i) =>
			prev
				? prev
				: prop(curr)
				? [i]
				: curr instanceof Array
				? ((x) => (x ? [i].concat(x) : x))(deepSearch(curr))
				: undefined,
		undefined
	)
