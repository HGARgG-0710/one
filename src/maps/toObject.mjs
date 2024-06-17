import { trivialCompose } from "../functions/functions.mjs"
import { dekv } from "../objects/objects.mjs"
import { kv } from "./main.mjs"
export const toObject = trivialCompose(dekv, kv)
