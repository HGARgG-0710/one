// * Methods for working with array trees;

import { mutate } from "../inplace/inplace.js"
import { last, lastOut } from "../arrays/arrays.js"
import { sum } from "../numbers/numbers.js"
import { isArray } from "../typeof/typeof.js"

export type ArrayTree<Type = any> = (ArrayTree<Type> | Type)[]

export const depth = <Type = any>(tree: ArrayTree<Type>) =>
	tree instanceof Array
		? 1 + (tree.length ? Math.max.apply(null, tree.map(depth)) : 0)
		: 0

export const recursiveIndexation = <Type = any>(
	tree: ArrayTree<Type>,
	multind: number[]
) => multind.reduce((acc, curr) => acc[curr], tree)

export const recursiveSetting = <Type = any>(
	tree: ArrayTree<Type>,
	multind: number[],
	value: any
) =>
	multind.length
		? (recursiveIndexation(tree, lastOut(multind))[last(multind)] = value)
		: undefined

export const treeCount = <Type = any>(
	tree: ArrayTree<Type>,
	prop: (x: any) => any = (x) => x,
	start: any = 0
): number | string =>
	tree
		.map((x) =>
			(isArray(x) ? (x: ArrayTree<Type>) => treeCount(x, prop, start) : prop)(
				x as ArrayTree<Type>
			)
		)
		.reduce((sum, summand) => sum + summand, start)

export const deepSearch = <Type = any>(
	tree: ArrayTree<Type>,
	prop: (x: any) => any
): number[] | undefined =>
	tree.reduce(
		(prev: number[] | undefined, curr, i) =>
			prev
				? prev
				: prop(curr)
				? [i]
				: curr instanceof Array
				? ((x) => (x ? [i].concat(x) : x))(deepSearch(curr, prop))
				: undefined,
		undefined
	)

export const levelCount = <Type = any>(tree: ArrayTree<Type>) =>
	+(tree instanceof Array) +
	sum(...tree.map((x) => (x instanceof Array ? levelCount(x) : 0)))

export const treeReverse = <Type = any>(tree: ArrayTree<Type>) =>
	tree instanceof Array ? mutate(tree.reverse(), treeReverse) : tree
