export const kv = (obj) => ["keys", "values"].map((x) => Object[x](obj))
export const dekv = (kv) =>
	kv.reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1] }), {})
