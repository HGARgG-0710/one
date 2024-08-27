import { kv, dekv, toObject } from "../src/maps/maps.js"

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

// * 'toObject'
console.log(
	toObject(
		new Map([
			["990", false],
			[2772, "990"],
			[function () {}, "KKKARR"],
			[{}, 9990],
			[{ "I AM ANOTHER": 990 }, "SIEG!"]
		])
	)
)
