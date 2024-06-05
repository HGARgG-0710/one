// * Methods for working with array trees;

import { lastOut } from "./arrays.mjs"

export const depth = (tree) =>
	((x) => (x ? 1 + (tree.length ? Math.max(...tree.map(depth)) : 0) : 0))(
		tree instanceof Array
	)

export const treeFlatten = (tree) =>
	tree.some((x) => x instanceof Array) ? treeFlatten(tree.flat()) : tree

export const recursiveIndexation = (tree, multind) =>
	multind.reduce((acc, curr) => acc[curr], tree)

export const recursiveSetting = (tree, multind, value) =>
	multind.length
		? (recursiveIndexation(tree, lastOut(multind))[last(multind)] = value)
		: undefined

export const treeCount = (tree, prop = (x) => x, start = 0) =>
	tree
		.map((x) => (x instanceof Array ? (x) => treeCount(x, prop, start) : prop)(x))
		.reduce((sum, summand) => sum + summand, start)

export const deepSearch = (tree, prop) =>
	tree.reduce(
		(prev, curr, i) =>
			prev
				? prev
				: prop(curr)
				? [i]
				: curr instanceof Array
				? ((x) => (x ? [i].concat(x) : x))(deepSearch(curr, prop))
				: undefined,
		undefined
	)

export const levelCount = (tree) =>
	(tree instanceof Array) +
	tree
		.map((x) => (x instanceof Array ? levelCount(x) : 0))
		.reduce((sum, summand) => sum + summand, 0)
