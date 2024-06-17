import { capitalize, extract, count, limit } from "../src/strings/strings.mjs"

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
console.log(limit(8, ".exe")("pleasedonrunmeimmalicious.exe"))
console.log(limit(800, ".exe")("pleasedonrunmeimmalicious.exe"))
console.log()
