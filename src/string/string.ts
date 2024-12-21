export const capitalize = (x: string) =>
	x.length ? `${x[0].toUpperCase()}${x.slice(1).toLowerCase()}` : ""

export const extract = (
	string: string,
	toExtract: string | RegExp,
	toReplaceWith: string = ""
) => string.split(toExtract).join(toReplaceWith)

export const count = (string: string, substring: string | RegExp) =>
	string.split(substring).length

export const limit =
	(maxsize: number, limitor = "") =>
	(string: string) =>
		`${string.slice(0, Math.min(string.length, maxsize))}${
			string.length > maxsize ? limitor : ""
		}`

export const lastOut = (x: string) => x.slice(0, x.length - 1)

export const sum = (...numbers: string[]) =>
	numbers.reduce((last, curr) => last + curr, "")
