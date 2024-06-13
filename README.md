# one

'one' is a JavaScript library purposed for serving as an alias space for tiny and frequently recurring tasks.

## Installation

```
npm install @hgargg-0710/one
```

## Documentation

### Modules

The library provides organizes its exports in separate modules.

They are:

1. `array`
2. `string`
3. `function`
4. `tree`
5. `object`
6. `set`
7. `map`
8. `number`

#### `array`

```ts
function lastOut(x: any[]): any[]
```

A function that returns a copy of the given array without its last element.

```ts
function last(x: any[]): any
```

A function that returns an array's last element.

```ts
function clear(x: any[]): 0
```

Sets the array's length to `0`, returning it.

```ts
function insert(x: any[], index: number, ...values: any[]): any[]
```

Inserts the `values` into `x` at index `index` and returns the result (new array is created).

```ts
function replace(arr: any[], index: number, ...values: any[]): any[]
```

Replaces the element of `arr` at `index` with `values` (creates a new array).

```ts
function out(arr: any[], index: number): any[]
```

Returns a copy of `arr`, in which the element at position `index` is absent.

```ts
function swapped(x: any[], i: number, j: number): any[]
```

Returns a new array in which `x` values at indexes `i` and `j` are swapped places.

```ts
function firstOut(x: any[]): any[]
```

Returns the copy of the given array without the first element (`x[0]`).

```ts
function first(x: any[]): any
```

Returns the first element of the given array.

```ts
function propPreserve(f: (x: object): any[]): (x: object): any[]
```

Creates and returns a new function based off the givn one that preserves the non-numeric properties
of the argument `x` upon the result of `f(x)`.

Intended for convertion of functions in terms of array to be able to preserve the custom properties
(and thus, be able to use arrays the same way as one would normally do with plain objects).

```ts
function iterator(x: any[]): GeneratorFunction
```

Creates and returns a new iterator function defined in terms of the given array.

```ts
function middleOutP(x: any[]): any[]
```

Discards the middle element from the copy of original array
(with preference to the latter half in even-`.length`ed ones),
and returns the copy.

```ts
function middleOutN(x: any[]): any[]
```

Same as `middleOutP`, but with preference to the former part in
even-`.length`ed arrays.

<br>

#### `string`

```ts
function capitalize(x: string): string
```

Returns capitalized version of the string - first character is brought to its upper case, while the rest are brought to their lower case.

```ts
function extract(x: string, toExtract: string | RegExp): string
```

Returns the new string derived from `x` without the appearences of `toExtract`.

```ts
function count(x: string, sub: string | RegExp): number
```

Counts the number of appearences of substring `sub` inside of `x`.

```ts
function limit(maxsize: number, limitor?: string): (x: string): string
```

A function returning a function that replaces the remainder of `x` after the maximum allowed length of `maxsize` with string `limitor`.

<br>

#### `function`

```ts
function ndepth(f: Function): (n: number, ...argsArr: any[]): any
```

Returns a sequence of nested function with call depth of `n` that reduces to `f(x1, x2, ..., xn, ...argsArr)`.

NOTE: same as doing manually:

```ts
// * was
const a = (x, y) => x + y
const b = (x) => (y) => x + y // b == ndepth(a)(2)
```

Useful for treating multivariable functions as a call-sequence of single-variable ones.

```ts
function or(...fs: Function[]): (...x: any[]): any
```

Iterates over the list of functions `fs`, returning the most truthy value of the returned (otherwise, the first function's value is returned).

```ts
function and(...fs: Function[]): (...x: any[]): any
```

The 'and'-counterpart of the `or` function.

```ts
function trivialCompose(...fs: Function[]): (...x: any[]): any
```

Returns a result of composition of single-variable functions with a (possibly) multi-variable one (last function).

The calling of the result is the same as `f1(f2(...(fn(...x))))`.

```ts
function iterations(f: Function, n: number, j?: number): any[]
```

Returns the result of iterations of function `f` from `0` to `n - 1` with a jump `j` (1 by default).va

```ts
function sequence(f: Function, n: number): (...args: any[]): any[]
```

Returns the list of results of 1-variable iteration of `f` upon itself from `1` to `n` times.

```ts
function repeat(f: Function, n: number): void
```

Calls the function `f` for values from `0` to `n-1`.

<br>

#### `tree`

NOTE: here 'trees' are nested arrays.

```ts
function depth(tree: any[]): number
```

Returns the maximum depth of a tree.

```ts
function treeFlatten(tree: any[]): any[]
```

Returns the completely flattened tree.

```ts
function recursiveIndexation(tree: any[], multindex: number[]): any
```

Returns the value obtained after recursively indexing the tree using the values from `multindex` number array.

```ts
function recursiveSetting(tree: any[], multindex: number[], value: any): any
```

Sets the value of `tree` at multi-index `multindex` to `value`.

```ts
function treeCount(
	tree: any[],
	prop: (x: any): boolean | number | string,
	start?: any
): boolean | number | string
```

Returns the 'recursive sum' of all the elements inside the tree (can be a kind of count or a string concatenation).
The default return value, `start` (by default, `0`), is appended every time a level is passed.

```ts
function levelCount(tree: any[]): number
```

Counts the number of levels inside the tree (including the initial one).

```ts
function deepSearch(tree: any[], prop: (x: any): boolean): number[]
```

Finds the first value `x` inside the `tree` such that `!!prop(x) == true` and returns its multi-index.

```ts
function treeReverseLR(tree: any[]): any[]
```

Reverses the tree from "left" to "right" - recursively applies `x.reverse()`
upon each of its elements, returns the tree's copy.

<br>

#### `object`

```ts
function kv(x: object): [string[], any[]]
```

Returns the pair of key-values of the given object.

```ts
function dekv(x: [string[], any[]]): object
```

Reverses the `kv`.

```ts
function structObject(props: string[]): (x: any): boolean
```

Creates and returns a new function that checks whether:

1. `typeof x === 'object'`
2. `!!x`
3. `props.every((p) => p in x)`

Allows to create handy predicates for checking structural adherence of `x` to
a certain necessary objects' "class" without needing to use more complex constructions
like prototype chains.

<br>

#### `set`

```ts
function same(a: Set, b: Set): boolean
```

Checks if sets are the same.

```ts
function norepetitions(x: any[]): any[]
```

Returns a new array with the elements of `x`, but without repetitions.

<br>

#### `map`

```ts
function kv(map: Map): [any[], any[]]
```

A `Map` version of `object.kv`.

```ts
function dekv(x: [any[], any[]]): Map
```

A `Map` version of `object.dekv`.

<br>

#### `number`

```ts
function sum(...x: string[] | number[]): number | string
```

Returns the sum of the given items `x`.

```ts
function product(...x: number[]): number
```

Returns the product of the given items `x`.
