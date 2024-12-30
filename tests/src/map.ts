import { kv, dekv, toObject } from "../../dist/src/maps/maps.js"

const testMap = new Map([
	["K", "p"],
	[45, "T"],
	[true, -11],
	[{}, "meow!"]
] as [any, any][])

// * 'kv'
console.log(kv(testMap))
console.log(kv(new Map([])))
console.log()

// * 'dekv'
console.log(dekv(kv(testMap)))
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
		] as [any, any][])
	)
)
