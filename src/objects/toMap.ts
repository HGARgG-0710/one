import { trivialCompose } from "../functions/functions.js"
import { dekv as mdekv } from "../maps/maps.js"
import { kv } from "./main.js"
export const toMap = trivialCompose(mdekv, kv)
