import { last, lastOut } from "../array/array.js"

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
		lastOut(fs).reduceRight((last, curr) => curr(last), last(fs)(...x))

export const iterations = (f: Function, n: number, j = 1) =>
	Array.from({ length: Math.floor(n / j) }, (_x, i) => f(j * i))

export const sequence =
	(f: Function, n: number) =>
	(...args: any[]) => {
		const seqres = n ? [f(...args)] : []
		for (let i = 0; i < n; ++i) seqres.push(f(last(seqres), i, seqres))
		return seqres
	}

export const repeat = (f: Function, n: number) => {
	for (let i = 0; i < n; ++i) f(i)
}

// ^ Same thing as 'trivialCompose', but functions return arrays and get expanded as one another's signatures (requires them to return arrays);
export const arrayCompose =
	(...fs: Function[]) =>
	(...x: any[]) =>
		fs.reduceRight((last, curr) => curr(...last), x)

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

export const cached = (base: Function) => {
	const cachedResult = function (x: any) {
		if (cachedResult.cache.has(x)) return cachedResult.cache.get(x)
		const retres = base(x)
		cachedResult.cache.set(x, retres)
		return retres
	}
	cachedResult.cache = new Map()
	return cachedResult
}

export const id = <Type = any>(x: Type) => x
export const nil = () => {}

export const constant = <T = any>(x: T) => () => x