import { trivialCompose } from "../functional/functional.js"
import { dekv } from "../object/object.js"
import { kv } from "./main.js"

/**
 * Converts a given `Map` into an `object`
 */
export const toObject = trivialCompose(dekv, kv) as (x: Map<string, any>) => object
