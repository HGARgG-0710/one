import { last, lastOut } from "./arrays.mjs"

export const ndepth =
	(f) =>
	(n, ...argsArr) => {
		if (n <= 0) return (x) => x
		if (n === 1) return (...x) => f(...argsArr.concat(x))
		return (...x) => ndepth(f)(n - 1, ...argsArr.concat(x))
	}

export const or =
	(...fs) =>
	(...x) =>
		fs.reduce((prev, curr) => (prev ? prev : curr(...x)), false)

export const and =
	(...fs) =>
	(...x) =>
		fs.reduce((prev, curr) => (prev ? curr(...x) : prev), true)

export const trivialCompose =
	(...fs) =>
	(...x) =>
		lastOut(fs).reverse().reduce((last, curr) => curr(last), last(fs)(...x))

export const iterations = (f, n, j = 1) =>
	Array(Math.floor(n / j))
		.fill(0)
		.map((_x, i) => f(j * i))

export const sequence =
	(f, n) =>
	(...args) =>
		Array(n)
			.fill(undefined)
			.map((_x, i) => i + 1)
			.reduce(
				(prev, curr) =>
					prev.concat(trivialCompose(...Array(curr).fill(f))(...args)),
				[]
			)

export const repeat = (f, n) =>
	Array(n)
		.fill(0)
		.forEach((_x, i) => f(i))
