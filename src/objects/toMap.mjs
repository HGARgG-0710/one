import { trivialCompose } from "../functions/functions.mjs"
import { dekv as mdekv } from "../maps/maps.mjs"
import { kv } from "./main.mjs"
export const toMap = trivialCompose(mdekv, kv)
