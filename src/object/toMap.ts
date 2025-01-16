import { trivialCompose } from "../functional/functional.js"
import { dekv as mdekv } from "../map/map.js"
import { kv, ObjectKey } from "./main.js"

/**
 * Creates a new `Map` from keys and values of the given object, returning it
 */
export const toMap = trivialCompose(mdekv, kv) as (x: object) => Map<ObjectKey, any>
