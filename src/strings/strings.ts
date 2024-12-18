export const capitalize = (x: string) =>
	`${x[0].toUpperCase()}${x.slice(1).toLowerCase()}`

export const extract = (string: string, toExtract: string | RegExp) =>
	string.split(toExtract).join("")

export const count = (string: string, substring: string | RegExp) =>
	string.split(substring).length - 1

export const limit =
	(maxsize: number, limitor = "") =>
	(string: string) =>
		`${string.slice(0, Math.min(string.length, maxsize))}${
			string.length > maxsize ? limitor : ""
		}`

export const lastOut = (x: string) => x.slice(0, x.length - 1)
