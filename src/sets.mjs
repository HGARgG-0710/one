export const sameSet = (a, b) =>
	a.size() === b.size() && Array.from(a).every((x) => b.has(x))
export const norepetitions = (x) => Array.from(new Set(x))
