import { last, lastOut } from "../arrays/arrays.js"

export const curry = (f: Function) => {
	const T = (n: number, ...argsArr: any[]) => {
		if (n <= 0) return (x: any) => x
		if (n === 1) return (...x: any[]) => f(...argsArr.concat(x))
		return (...x: any[]) => T(n - 1, ...argsArr.concat(x))
	}
	return T
}

export const or =
	(...fs: Function[]) =>
	(...x: any[]) =>
		fs.reduce((prev, curr) => (prev ? prev : curr(...x)), false)

export const and =
	(...fs: Function[]) =>
	(...x: any[]) =>
		fs.reduce((prev, curr) => (prev ? curr(...x) : prev), true)

export const trivialCompose =
	(...fs: Function[]) =>
	(...x: any[]) =>
		lastOut(fs)
			.reverse()
			.reduce((last, curr) => curr(last), last(fs)(...x))

export const iterations = (f: Function, n: number, j = 1) =>
	Array(Math.floor(n / j))
		.fill(0)
		.map((_x, i) => f(j * i))

export const sequence =
	(f: Function, n: number) =>
	(...args: any[]) =>
		Array(n)
			.fill(undefined)
			.map((_x, i) => i + 1)
			.reduce(
				(prev, curr) =>
					prev.concat(trivialCompose(...Array(curr).fill(f))(...args)),
				[]
			)

export const repeat = (f: Function, n: number) => {
	const vals = Array(n).fill(0)
	for (let i = 0; i < vals.length; ++i) f(i)
}

// ^ Same thing as 'trivialCompose', but functions return arrays and get expanded as one another's signatures (requires them to return arrays);
export const arrayCompose =
	(...fs: Function[]) =>
	(...x: any[]) =>
		fs.reverse().reduce((last, curr) => curr(...last), x)

export const cache = (f: Function, keys: any): Map<any, any> =>
	new Map(keys.map((x: any) => [x, f(x)]))

export const tupleSlice =
	(...inds: number[][]) =>
	(...fs: Function[]) =>
	(...x: any[]) =>
		fs.map((f, i) => f(...x.slice(...(inds[i] || []))))

export const tuplePick =
	(...inds: ((value: any, index: number, array: any[]) => any)[]) =>
	(...fs: Function[]) =>
	(...x: any[]) =>
		fs.map((f, i) => f(...x.filter(inds[i] || (() => true))))
