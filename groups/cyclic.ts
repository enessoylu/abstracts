import { BinaryOperation, Group, UnaryOperation } from "../types";
import { range } from "../utils";

// any number from 0...n which is relatively prime with n generates order n cyclic group
const CyclicGroupOf = (n: number): Group<number> => {
  const list = range(n);
  const e = 0;

  const mul = (s: number, t: number) => (s + t) % n
  const inverse = (s: number) => n - s

  return new (class implements Group<number> {
    inverse = inverse;
    e = e;
    set = list;
    mul = mul;
  })
}

export { CyclicGroupOf }
