import { Group } from "./implement";
import { range } from "../utils";

// any number from 0...n which is relatively prime with n generates order n cyclic group
const CyclicGroupOf = (n: number) => {
  const list = range(n);

  const mul = (s: number, t: number) => (s + t) % n

  return new Group(list, mul)
}

export { CyclicGroupOf }
