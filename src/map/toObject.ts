import { trivialCompose } from "../functional/functional.js"
import { dekv } from "../object/object.js"
import { kv } from "./main.js"
export const toObject = trivialCompose(dekv, kv)
