export const kv = (obj) => ["keys", "values"].map((x) => Object[x](obj))
export const dekv = (kv) =>
	((x, y) => x.reduce((prev, curr, i) => ({ ...prev, [curr]: y[i] }), {}))(...kv)
