export const kv = (map) => ["keys", "values"].map((x) => Array.from(map[x]()))
export const dekv = (kv) =>
	((x, y) =>
		x.reduce((prev, curr, i) => {
			prev.set(curr, y[i])
			return prev
		}, new Map()))(...kv)
