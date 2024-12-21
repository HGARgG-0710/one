export const same = <T = any>(a: Set<T>, b: Set<T>) =>
	a.size === b.size && Array.from(a).every((x) => b.has(x))
export const norepetitions = <T = any>(x: Iterable<T>) => Array.from(new Set<T>(x))
