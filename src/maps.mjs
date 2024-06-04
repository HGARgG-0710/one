export const kv = (obj) => ["keys", "values"].map((x) => obj[x]())
export const dekv = (kv) =>
	kv.reduce((prev, curr) => {
		prev.set(curr[0], curr[1])
		return prev
	}, new Map())
