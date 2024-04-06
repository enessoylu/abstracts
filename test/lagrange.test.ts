import { describe, expect, test } from "vitest";
import { Group } from "../types/group";
import { SymmetricGroupOf } from "../groups/symmetric";
import { CyclicGroupOf } from "../groups/cyclic";
import { fromGenerator } from "../groups/utils";

// Let G be a finite group and H a subgroup of G. Then the number of elements in H is a divisor of the number of elements in G.
describe('Lagrange theorem', () => {
  test('by subgroups of C12', () => {
    const C12 = CyclicGroupOf(12)
  
    const isDivisor = (subgroup: Group<number>) => C12.set.length % subgroup.set.length === 0
  
    const s1 = fromGenerator([3], C12.mul, C12.inverse)
    expect(isDivisor(s1)).toBe(true);
  
    const s2 = fromGenerator([2], C12.mul, C12.inverse)
    expect(isDivisor(s2)).toBe(true);
  
    const s3 = fromGenerator([4], C12.mul, C12.inverse)
    expect(isDivisor(s3)).toBe(true);
  
    const s4 = fromGenerator([6], C12.mul, C12.inverse)
    expect(isDivisor(s4)).toBe(true);
  
    const s5 = fromGenerator([1], C12.mul, C12.inverse)
    expect(isDivisor(s5)).toBe(true);
  })

  test('by subgroups of S4', () => {
    const S4 = SymmetricGroupOf(4)

    const isDivisor = (subgroup: Group<string>) => S4.set.length % subgroup.set.length === 0

    const s1 = fromGenerator(['(1,2)'], S4.mul, S4.inverse)
    expect(isDivisor(s1)).toBe(true);
    
    const s2 = fromGenerator(['(1,2)', '(2,3)'], S4.mul, S4.inverse)
    expect(isDivisor(s2)).toBe(true);
    
    const s3 = fromGenerator(['(1,2,3,4)'], S4.mul, S4.inverse)
    expect(isDivisor(s3)).toBe(true);
  })
})
