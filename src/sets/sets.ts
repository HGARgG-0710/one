export const same = <T = any>(a: Set<T>, b: Set<T>) =>
	a.size === b.size && Array.from(a).every((x) => b.has(x))
export const norepetitions = (x: Iterable<any>) => Array.from(new Set(x))
