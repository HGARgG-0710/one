export const capitalize = (x) => `${x[0].toUpperCase()}${x.slice(1).toLowerCase()}`
export const extract = (string, toExtract) => string.split(toExtract).join("")
export const count = (string, substring) => string.split(substring).length - 1
export const limit =
	(maxsize, limitor = "") =>
	(string) =>
		`${string.slice(0, Math.min(string.length, maxsize))}${
			string.length > maxsize ? limitor : ""
		}`
