import { trivialCompose } from "../functional/functional.js"
import { dekv as mdekv } from "../map/map.js"
import { kv } from "./main.js"
export const toMap = trivialCompose(mdekv, kv)
