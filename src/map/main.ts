export type MapKeyValues = [any[], any[]]

export const kv = (map: Map<any, any>): MapKeyValues => [
	Array.from(map.keys()),
	Array.from(map.values())
]

export const dekv = (kv: MapKeyValues): Map<any, any> =>
	((x, y) =>
		x.reduce((prev: Map<any, any>, curr, i) => {
			prev.set(curr, y[i])
			return prev
		}, new Map()))(...kv)
