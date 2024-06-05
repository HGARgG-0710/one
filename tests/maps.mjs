import { kv, dekv } from "../src/maps.mjs"

// * 'kv'
console.log(
	kv(
		new Map([
			["K", "p"],
			[45, "T"],
			[true, -11],
			[{}, "meow!"]
		])
	)
)
console.log(kv(new Map([])))
console.log()

// * 'dekv'
console.log(
	dekv(
		kv(
			new Map([
				["K", "p"],
				[45, "T"],
				[true, -11],
				[{}, "meow!"]
			])
		)
	)
)
console.log(dekv(kv(new Map([]))))
console.log()
