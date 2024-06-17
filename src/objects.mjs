import { trivialCompose } from "./functions.mjs"
import { dekv as mdekv } from "./maps.mjs"

export const kv = (obj) => ["keys", "values"].map((x) => Object[x](obj))
export const dekv = (kv) =>
	((x, y) => x.reduce((prev, curr, i) => ({ ...prev, [curr]: y[i] }), {}))(...kv)

export const structCheck =
	(...properties) =>
	(x) =>
		typeof x === "object" && !!x && properties.flat().every((y) => y in x)

export const toMap = trivialCompose(mdekv, kv)
