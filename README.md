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

<br>

#### `string`

```js
function capitalize(x: string): string
```

Returns capitalized version of the string - first character is brought to its upper case, while the rest are brought to their lower case.

```js
function extract(x: string, toExtract: string | RegExp): string
```

Returns the new string derived from `x` without the appearences of `toExtract`.

```js
function count(x: string, sub: string | RegExp): number
```

Counts the number of appearences of substring `sub` inside of `x`.

```js
function limit(maxsize: number, limitor?: string): (x: string) => string
```

A function returning a function that replaces the remainder of `x` after the maximum allowed length of `maxsize` with string `limitor`.

<br>

#### `function`

```js
function ndepth(f: Function): (n: number, ...argsArr: any[]) => any
```

Returns a sequence of nested function with call depth of `n` that reduces to `f(x1, x2, ..., xn, ...argsArr)`.

NOTE: same as doing manually:

```js
// * was
const a = (x, y) => x + y
const b = (x) => (y) => x + y // b == ndepth(a)(2)
```

Useful for treating multivariable functions as a call-sequence of single-variable ones.

```js
function or(...fs: Function[]): (...x: any[]) => any
```

Iterates over the list of functions `fs`, returning the most truthy value of the returned (otherwise, the first function's value is returned).

```js
function and(...fs: Function[]): (...x: any[]) => any
```

The 'and'-counterpart of the `or` function.

```js
function trivialCompose(...fs: Function[]): (...x: any[]) => any
```

Returns a result of composition of single-variable functions with a (possibly) multi-variable one (last function).

The calling of the result is the same as `f1(f2(...(fn(...x))))`.

```js
function iterations(f: Function, n: number, j?: number): any[]
```

Returns the result of iterations of function `f` from `0` to `n - 1` with a jump `j` (1 by default).va

```js
function sequence(f: Function, n: number): (...args: any[]) => any[]
```

Returns the list of results of 1-variable iteration of `f` upon itself from `1` to `n` times.

```js
function repeat(f: Function, n: number): void
```

Calls the function `f` for values from `0` to `n-1`.

<br>

#### `tree`

NOTE: here 'trees' are nested arrays.

```js
function depth(tree: any[]): number
```

Returns the maximum depth of a tree.

```js
function treeFlatten(tree: any[]): any[]
```

Returns the completely flattened tree.

```js
function recursiveIndexation(tree: any[], multindex: number[]): any
```

Returns the value obtained after recursively indexing the tree using the values from `multindex` number array.

```js
function recursiveSetting(tree: any[], multindex: number[], value: any): any
```

Sets the value of `tree` at multi-index `multindex` to `value`.

```js
function treeCount(tree: any[], prop: (x) => boolean | number | string, start?: any): boolean | number | string
```

Returns the 'recursive sum' of all the elements inside the tree (can be a kind of count or a string concatenation).
The default return value, `start` (by default, `0`), is appended every time a level is passed.

```js
function levelCount(tree: any[]): number
```

Counts the number of levels inside the tree (including the initial one).

```js
function deepSearch(tree: any[], prop: (x) => boolean): number[]
```

Finds the first value `x` inside the `tree` such that `!!prop(x) == true` and returns its multi-index.

<br>

#### `object`

```js
function kv(x: object): [string[], any[]]
```

Returns the pair of key-values of the given object.

```js
function dekv(x:  [string[], any[]]): object
```

Reverses the `kv`.

<br>

#### `set`

```js
function same(a: Set, b: Set): boolean
```

Checks if sets are the same.

```js
function norepetitions(x: any[]): any[]
```

Returns a new array with the elements of `x`, but without repetitions.

<br>

#### `map`

```js
function kv(map: Map): [any[], any[]]
```

A `Map` version of `object.kv`.

```js
function dekv(x: [any[], any[]]): Map
```

A `Map` version of `object.dekv`.
