import { Group } from "../types/group";
import { fromCycles, toCycleString, permute, multiply, inverseOfPermutation } from "./permutation";

const SymmetricGroupOf = (n: number): Group<string> => {
  const e = '';
  const mul = (a: string, b: string) => toCycleString(multiply(fromCycles(a), fromCycles(b)))
  const inverse = (a: string) => inverseOfPermutation(a)
  const set = permute(n).map(list => toCycleString(list).toString());

  return {
    e,
    set,
    inverse,
    mul,
  }
}

export {
  SymmetricGroupOf
}

