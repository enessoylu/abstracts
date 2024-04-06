import { Group } from "../types/group";
import { range } from "../utils";

// any number from 0...n which is relatively prime with n generates order n cyclic group
const CyclicGroupOf = (n: number): Group<number> => {
  const set = range(n);
  const e = 0;

  const mul = (s: number, t: number) => (s + t) % n
  const inverse = (s: number) => n - s

  return {
    inverse,
    e,
    set,
    mul,
  }
}

export { CyclicGroupOf }
