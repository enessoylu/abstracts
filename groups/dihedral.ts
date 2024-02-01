// n rotations n reflections
// r rotation s reflection, rsr = s, ss = e, rr... = e 
// s,t are adjacent axes of symmetry on n-gon, st is a rotation
// s = rf, t = f, st = rff
import { Group } from "../types/group";

const d4 = ["e", "r", "rr", "rrr", "s", "sr", "srr", "srrr"] as const;
const d4MultiplicationTable = [
/* e   */["e", "r", "rr", "rrr", "s", "sr", "srr", "srrr"],
/* r   */["r", "rr", "rrr", "e", "sr", "srr", "srrr", "s"],
/* rr  */["rr", "rrr", "e", "r", "srr", "srrr", "s", "sr"],
/* e   */["e", "r", "rr", "rrr", "s", "sr", "srr", "srrr"],
/* rrr */["rrr", "e", "r", "rr", "srrr", "s", "sr", "srr"],
]

class D4 implements Group<string> {
  set = [...d4]
  e = "e"
  order = this.set.length

  mul(x, y) {
    const xIdx = d4.indexOf(x)
    const yIdx = d4.indexOf(y)
    return d4MultiplicationTable[xIdx][yIdx]
  }
  inverse(x) {
    const xIdx = d4.indexOf(x)
    return d4[d4MultiplicationTable[xIdx].indexOf("e")]
  }
}

export {
  D4
}