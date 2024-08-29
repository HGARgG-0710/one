import { capitalize, extract, count, limit } from "../../dist/src/strings/strings.js"

// * 'capitalize'
console.log(capitalize("JJBJBJKBLAAfdad"))
console.log(capitalize("zcvzxddaAdfBDGAs"))
console.log()

// * extract
console.log(extract("BARKBARKbartsimpsonBARKBarkKlaus", /bartsimpson|Bark/))
console.log(extract("Joule", "oul"))
console.log()

// * count
console.log(count("BARKBARKbartsimpsonBARKBarkKlaus", /bartsimpson|Bark|Klaus/))
console.log(count("JooouleoIo", "o"))
console.log()

// * limit
const limitString = "pleasedontrunmeimmalicious.exe"
console.log(limit(8, ".exe")(limitString))
console.log(limit(800, ".exe")(limitString))
console.log()
