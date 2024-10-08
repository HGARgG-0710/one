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

1. [`array`](#array)
2. [`string`](#string)
3. [`function`](#function)
4. [`tree`](#tree)
5. [`object`](#object)
6. [`set`](#set)
7. [`map`](#map)
8. [`number`](#number)
9. [`inplace`](#inplace)
10. [`typeof`](#typeof)
11. [`boolean`](#boolean)

#### `array`

```ts
function lastOut<Type = any>(x: Type[]): Type[]
```

Returns a copy of the given array without its last element.

<br>

```ts
function last<Type = any>(x: Type[]): Type
```

Returns the given array's last element.

<br>

```ts
function clear<Type = any>(x: Type[]): number
```

Sets the array's length to `0`

<br>

```ts
function insert<Type = any>(x: Type[], index: number, ...values: Type[]): Type[]
```

Inserts the `values` into `x` at index `index` and returns the result (new array is created).

<br>

```ts
function replace<Type = any>(arr: Type[], index: number, ...values: Type[]): any[]
```

Returns a copy of `arr`, in which the value at index `index` was replaced by `values`.

<br>

```ts
function out<Type = any>(arr: Type[], index: number): Type[]
```

Returns a copy of `arr`, in which the element at position `index` is absent.

<br>

```ts
function firstOut<Type = any>(x: Type[]): Type[]
```

Returns the copy of the given array without the first element (`x[0]`).

<br>

```ts
function first<Type = any>(x: Type[]): Type
```

Returns the first element of the given array.

<br>

```ts
function filter<Type = any>(array: Type[], prop: (item?: Type, index?: number, array?: Type[]) => boolean): Type[]
```

A rewrite of the `Array.prototype.filter`. In V8, serves to be faster on certain large enough arrays. 

<br>

```ts
function map<TypeFrom = any, TypeTo = any>(array: TypeFrom[], f: (item?: TypeFrom, index?: number, array?: TypeFrom[]) => TypeTo): TypeTo[]
```

A rewrite of the `Array.prototype.map`. In v8, serves to be faster on certain large enough arrays.

<br>

```ts
function copy<Type = any>(array: Type[]): Type[]
```

Copies the given array. 

<br>

```ts
function reduce(	
	array: Type[],
	f: (item?: any, curr?: Type, i?: number) => any,
	init: any
)
```

A rewrite of the `Array.prototype.reduce`. In V8, serves to be faster on certain large enough arrays. 

<br>

```ts
function reduceRight(
	array: Type[],
	f: (item?: any, curr?: Type, i?: number) => any,
	init: any
)
```

A rewrite of the `Array.prototype.reduceRight`. In V8, serves to be faster on certain large enough arrays. 

<br>

```ts
function propPreserve(f: (x: object) => any[]): (x: object) => any[]
```

Creates and returns a new function based off the given one that preserves the non-numeric own properties
of the argument `x` upon the result of `f(x)`.

Intended for convertion of functions in terms of array to be able to preserve the custom properties
(and thus, be able to use arrays the same way as one would normally do with plain objects).

<br>

```ts
function middleOutP<Type = any>(x: Type[]): Type[]
```

Discards the middle element from the copy of original array
(with preference to the latter half in even-`.length`ed ones),
and returns the copy.

<br>

```ts
function middleOutN<Type = any>(x: Type[]): Type[]
```

Same as `middleOutP`, but with preference to the former part in
even-`.length`ed arrays.

<br>

#### `string`

```ts
function capitalize(x: string): string
```

Returns capitalized version of the string - first character is brought to its upper case, while the rest are brought to their lower case.

<br>

```ts
function extract(x: string, toExtract: string | RegExp): string
```

Returns the new string derived from `x` without the appearences of `toExtract`.

<br>

```ts
function count(x: string, sub: string | RegExp): number
```

Counts the number of appearences of substring `sub` inside of `x`.

<br>

```ts
function limit(maxsize: number, limitor?: string): (x: string) => string
```

A function returning a function that replaces the remainder of `x` after the maximum allowed length of `maxsize` with string `limitor`.

<br>

#### `function`

```ts
function curry(f: Function): (n: number, ...argsArr: any[]) => any
```

Returns a sequence of nested function with call depth of `n` that reduces to `f(x1, x2, ..., xn, ...argsArr)`.

NOTE: same as doing manually:

```ts
const a = (x, y) => x + y // * was
const b = (x) => (y) => x + y // equiv: b = curry(a)(2)
```

Useful for treating multivariable functions as a call-sequence of single-variable ones.

<br/>

```ts
function or(...fs: Function[]): (...x: any[]) => any
```

Iterates over the list of functions `fs`, returning the most truthy value of the returned (otherwise, the first function's value is returned).

<br/>

```ts
function and(...fs: Function[]): (...x: any[]) => any
```

The 'and'-counterpart of the `or` function.

<br/>

```ts
function trivialCompose(...fs: Function[]): (...x: any[]) => any
```

Returns a result of composition of single-variable functions with a (possibly) multi-variable one (last function).

The calling of the result is the same as `f1(f2(...(fn(...x))))`.

<br/>

```ts
function iterations(f: Function, n: number, j?: number): any[]
```

Returns the result of iterations of function `f` from `0` to `n - 1` with a jump `j` (1 by default).va

<br/>

```ts
function sequence(f: Function, n: number): (...args: any[]) => any[]
```

Returns the list of results of 1-variable iteration of `f` upon itself from `1` to `n` times.

<br/>

```ts
function repeat(f: Function, n: number): void
```

Calls the function `f` for values from `0` to `n-1`.

<br/>

```ts
function arrayCompose(...fs: ((...x: any[]) => any[])[]): (...x) => any
```

A function that accepts an array of functions, each of which returns an array.
The functions are then composed in a fashion that uses the output of each (an array)
as signature for the next function (that being, the result of the next function are expanded).

<br>

```ts
function cache(f: (x: any) => any, keys: any[]): Map
```

Creates a new `Map`, with keys of `keys` and values of `f(key)` for each `key` in `keys`.

This, effectively, caches a portion of the function's domain so that its cached values can be retrieved like:

```ts
const f = ...
const cached = cache(f, ...)
const value = c.get(...)
```

<br>

```ts
function tuplePick(...inds: ((x: any, i: number, arr: any[]) => boolean)[]): (...fs: (...x: any[]) => any) => (...x: any[]) => any
```

A function that returns a sequence of functions that result in a tuple consisting of
values returned from each of functions from `fs` function array, with values
being from `x` array, and `i`th function only using the values `x.filter((inds[i] || (() => true))`.

<br>

```ts
function cached(base: Function): {
	(x: any) => any
	cache: Map<any, any>
}
```

Given a function `base`, creates a new one that is cached upon every call;
Good for saving memory on `cache`-functions that may not need to be used (and that are static);
`.cache` property has domain items as keys and obtained `base` return values as values;

<br>

```ts
function tupleSlice(...inds: [number?, number?][]): (...fs: (...x: any[]) => any) =>  (...x: any[]) => any
```

Similar to `tuplePick`, but operates on `.slice`-ranges from `inds` instead
(the array of indexes for `i`th function is sliced using `inds[i]`).

<br>

```ts
function nil(): void
```

A no-op function `() => {}`. Useful as an alias [style consistency]

<br>

```ts
function id<Type = any>(x: Type) => Type
```

The identity function `(x) => x`. Useful as an alias [style consistency].

<br>

#### `tree`

NOTE: here 'trees' are nested arrays.

```ts
function depth(tree: any[]): number
```

Returns the maximum depth of a tree.

<br>

```ts
function treeFlatten(tree: any[]): any[]
```

Returns the completely flattened tree.

<br>

```ts
function recursiveIndexation(tree: any[], multindex: number[]): any
```

Returns the value obtained after recursively indexing the tree using the values from `multindex` number array.

<br>

```ts
function recursiveSetting(tree: any[], multindex: number[], value: any): any
```

Sets the value of `tree` at multi-index `multindex` to `value`.

<br>

```ts
function treeCount(
	tree: any[],
	prop: (x: any) => boolean | number | string,
	start?: any
): boolean | number | string
```

Returns the 'recursive sum' of all the elements inside the tree (can be a kind of count or a string concatenation).
The default return value, `start` (by default, `0`), is appended every time a level is passed.

<br>

```ts
function levelCount(tree: any[]): number
```

Counts the number of levels inside the tree (including the initial one).

<br>

```ts
function deepSearch(tree: any[], prop: (x: any) => boolean): number[]
```

Finds the first value `x` inside the `tree` such that `!!prop(x) == true` and returns its multi-index.

<br>

```ts
function treeReverse(tree: any[]): any[]
```

Reverses the tree from "left" to "right" - recursively applies `x.reverse()`
upon each of its elements, returns the tree's copy.

<br>

#### `object`

```ts
function kv(x: object): [(string | symbol)[], any[]]
```

Returns the pair of `[keys(x), values(x)]` of the given object.

<br>

```ts
function dekv(x: [(string | symbol)[], any[]]): object
```

Creates an object from given pair of arrays, treating first one as own keys, 
and the second one as own values. 

<br>

```ts
function keys(x: object): (string | symbol)[]
```

Returns all the string and symbolic keys from the given object, and all of its prototypes.

<br>

```ts
function values(x: object): any[]
```

Returns all the values of all the symbolic and string properties from the given object, and all of its prototypes.

<br>

```ts
function recursiveStringKeys(x: object): string[]
```

Returns all the string keys of the given object, and all of its prototypes.

<br>

```ts
function recursiveStringValues(x: object): any[]
```

Returns all the values of string keys of the given object, and all of its prototypes.

<br>

```ts
function recursiveSymbolKeys(x: object): symbol[]
```

Returns all the symbolic keys of the given object, and all of its prototypes.

<br>

```ts
function recursiveSymbolValues(x: object): any[]
```

Returns all the values of the symbolic keys of the given object, and all of its prototypes.

<br>

```ts
function ownProperties(x: object): [(string | symbol)[], any[]]
```

Returns a pair of arrays of own keys and own values of `x`. 

<br>

```ts
function ownKeys(x: object): (string | symbol)[]
```

Returns an array of own keys of the given object.

<br>

```ts
function ownValues(x: object): any[]
```

Returns an array of own keys' values of the given object.

<br>

```ts
function structCheck<Type extends object = object>(props: (string | symbol | number)[] | {[x: string | symbol | number]: (x: any) => boolean}, lackingProps?: (string | symbol | number)[], isStrict?: boolean): (x: any) => x is Type
```

Creates and returns a new type-checking function.

If `props` is an array, it returns `true` when:

1. `typeof x === 'object'`
2. `!!x`
3. `props.every((p) => p in x)`
4. `lackingProps.every((p) => !(p in x))`
5. `!isStrict || keys(x).length === props.length`

If `props` is an object, it checks:

1. `typeof x === 'object'`
2. `!!x`
3. `Object.keys(props).every((p) => p in x)`
4. `Object.values(props).every((p, i) => p(x[Object.keys(props)[i]]))`
5. `lackingProps.every((p) => !(p in x))`
6. `!isStrict || keys(x).length === keys(props).length`

By default, `lackingProperties = []` and `isStrict = false`. 

Allows to create handy predicates for checking structural adherence of `x` to
a certain necessary objects' "class" without needing to use more complex constructions like prototype chains [even though, it does permit prototyping on the object `props` used for setting the type's signature]. 

Now with additional TypeScript support
(type predicates - very util for connecting the "actual" JS properties
with those that are perceived by the static type analyzer, and when thorough checking is desired; example: test-writing);

<br>

```ts
function toMap(x: object): Map
```

Converts the given object to a `Map`.

<br>

#### `set`

```ts
function same<Type = any>(a: Set<Type>, b: Set<Type>): boolean
```

Checks if sets are the same.

<br>

```ts
function norepetitions<Type = any>(x: Iterable<T>): Type[]
```

Returns a new array with the elements of `x`, but without repetitions.

<br>

#### `map`

```ts
function kv(map: Map): [any[], any[]]
```

A `Map` version of `object.kv`.

<br>

```ts
function dekv(x: [any[], any[]]): Map
```

A `Map` version of `object.dekv`.

<br>

```ts
function toObject(map: Map): object
```

Converts the given `Map` to an `object`.

<br>

#### `number`

```ts
function sum(...x: string[] | number[]): number | string
```

Returns the sum of the given items `x`.

<br>

```ts
function product(...x: number[]): number
```

Returns the product of the given items `x`.

<br>

#### `inplace`

This library module contains various simple expressions pertaining to mutations of various structures (as of present - primarily arrays). It exists in contrast of the others, which are not as memory-efficient (ex: `array`);

```ts
function mutate<Type = any>(array: Type[], mutation: (x: Type, i: number, array: Type[]) => any): any[]
```

The function walks through the given array `array`, and applies the `mutation` function to each of its elements (in a fashion similar to `Array.prototype.map`), assigning the result to the corresponding array index.

The return value is the reference to the original array.

<br>

```ts
function insert<Type = any>(array: Type[], index: number, ...values: Type[]): Type[]
```

Mutates the given array `array` by inserting the given `values` at index `index`.
The return value is the reference to the original array.

<br>

```ts
function out<Type = any>(array: Type[], index: number, count?: number): Type[]
```

Deletes `count` values of `array`, starting from the index `index`. Default value of `count` is `1`.

<br>

```ts
function lastOut<Type = any>(array: Type[]): Type[]
```

Deletes the last item from the array, returns the reference to it.

<br>

```ts
function firstOut<Type = any>(array: Type[]): Type[]
```

Deletes the first element from the given array. Returns the reference to the array.

<br>

```ts
function swap<Type = any>(array: Type[], i: number, j: number): Type[]
```

Swaps two positions `i` and `j` of an array.

<br>

```ts
function replace<Type = any>(array: Type[], index: number, ...values: Type[]): Type[]
```

Replaces the value at a given index `index` of the array `array` with `values`, returning the reference to it.

#### `typeof`

This module provides functions that can be used for type-checking of given values (particularly useful in conjunction with TypeScript).

```ts
function isNumber(x: any): x is number
```

Returns `true` whenever `x` is a `number` primitive

<br>

```ts
function isFunction(x: any): x is Function
```

Returns `true` whenever the argument is a `Function`

<br>

```ts
function isString(x: any): x is string
```

Returns `true` whenever `x` is a `string` primitive

<br>

```ts
function isBoolean(x: any): x is boolean
```

Returns `true` whenever `x` is either `true` of `false`

<br>

```ts
function isSymbol(x: any): x is symbol
```

Returns `true` whenever `x` is a `symbol`

<br>

```ts
function isObject<Type extends object = object>(x: any): x is Type
```

Returns `true` whenever `x` is an `object`.
Via the Generic argument, TypeScript static type analyzer
can be made to know that the type of the item in question is more
than just an `object` (useful when context is known).

<br>

```ts
function isArray<Type = any>(x: any): x is Type[]
```

Returns `true` whenever `x` is an `Array`

<br>

```ts
function isNull(x: any): x is null
```

Checks that `x === null`.
[TypeScript] For cases when `strictNullChecks` is set to `true` in `tsconfig.json`.

<br>

```ts
function isUndefined(x: any): x is undefined
```

Checks that `x === undefined`.
[TypeScript] For cases when `strictNullChecks` is set to `true` in `tsconfig.json`.

<br>

```ts
function typeOf(x: any): typeof x
```

Returns `typeof x`. Can be used as a functional wrapper.

<br>

```ts
function isNumberConvertible(x: any): boolean
```

Returns `true`, only when one of the following holds: 

1. `x === null`
2. `typeof x === "number" && !isNaN(x)`
3. `typeof x === "string" && !isNaN(Number(x)) && !!x.length`
4. `typeof x === "boolean"`

The condition is equivalent to `x` being `Number` convertible validly, while not being an empty string.
Useful for safe `Number` conversions (in particular - when trying `Number(Symbol(...))`, one will encounter an error; Prior checking through the `isNumberConvertible(x)` in question permits one to safely avoid this).

<br>

#### `boolean`

This module contains operations that are common to the `boolean` type;

```ts
function not(x: any): boolean
```

Equivalent of the `!x` expression;

```ts
function T(): true
```

Equivalent of the `() => true` expression

```ts
function F(): false
```

Equivalent of the `() => false` expression

```ts
function equals<Type = any>(x: Type, y: Type): boolean
```

Equivalent of `(x, y) => x === y` expression
