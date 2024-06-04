export const ndepth =
	(f) =>
	(n, argsArr = []) => {
		if (ndepth <= 0) return (x) => x
		if (ndepth === 1) return (x) => f(x, ...argsArr)
		return (x) => ndepth(f)(n - 1, argsArr.concat([x]))
	}

export const or =
	(...fs) =>
	(...x) => {
		if (!fs.length) return false
		return fs[0](...x) || or(...fs.slice(1))(...x)
	}

export const and =
	(...fs) =>
	(...x) => {
		if (fs.length === 0) return true
		return fs[0](...x) && and(...fs.slice(1))(...x)
	}

export const trivialCompose =
	(fs) =>
	(...x) => {
		if (!fs.length) return (x) => x
		if (fs.length === 1) return fs[0](...x)
		return fs[0](trivialCompose(fs.slice(1))(...x))
	}

export const iterations = (f, n, j = 1) =>
	Array(Math.floor(n / j))
		.fill(0)
		.map((_x, i) => f(j * i))

export const sequence =
	(f, n) =>
	(...args) =>
		Array(n)
			.fill(undefined)
			.map((_x, i) => i)
			.reduce(
				(prev, curr) => prev.concat(trivialCompose(Array(curr).fill(f))(...args)),
				[]
			)

export const repeat = (f, n) =>
	Array(n)
		.fill(0)
		.forEach((_x, i) => f(i))
