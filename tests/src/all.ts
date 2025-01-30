import { fork } from "child_process"
import { readdirSync } from "fs"

function forkSync(modulePath: string) {
	return new Promise((resolve: (value: number | null) => void, _reject) => {
		const child = fork(modulePath, { stdio: "inherit" })
		child.on("close", (code) => resolve(code))
	})
}

const codes: number[] = []
for (const testFileName of readdirSync(`${import.meta.dirname}/modules`)) {
	const code = await forkSync(`modules/${testFileName}`)
	if (code) codes.push(code)
}
if (codes.length) process.exit(1)
