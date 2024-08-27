import { trivialCompose } from "../functions/functions.js"
import { dekv } from "../objects/objects.js"
import { kv } from "./main.js"
export const toObject = trivialCompose(dekv, kv)
