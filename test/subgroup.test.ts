import { describe, expect, test } from "vitest";
import { CyclicGroupOf, fromCycles, fromGenerator, inverseOfPermutation, multiply, printTable, toCycleString } from "../groups"
import { SymmetricGroupOf } from "../groups/symmetric";
import { Group } from "../types";
import { DihedralGroupOfOrder } from "../groups/dihedral";

test('Subgroups', () => {
  const S3 = SymmetricGroupOf(3);

  printTable(S3)

  const sub_items = [
    '(1,2,3)',
    '(1,3,2)',
    '',
  ]
  const sub_mul = (a: string, b: string) => toCycleString(multiply(fromCycles(a), fromCycles(b)))

  const sub_inverse = inverseOfPermutation
  const sub_e = '';
  const subS3: Group<string> = {
    e: sub_e,
    inverse: sub_inverse,
    mul: sub_mul,
    set: sub_items
  }

  printTable(subS3)
})

describe('Generator', () => {
  test('cyclic', () => {
    const C12 = CyclicGroupOf(12)
    const subgroup = fromGenerator([3], C12.mul, C12.inverse)
  
    expect(subgroup.e).toBe(0)
    expect(subgroup.set).toEqual(expect.arrayContaining([0, 3, 6, 9]))
  })

  test('dihedral', () => {
    const D4 = DihedralGroupOfOrder(8)
    
    const subgroupH = fromGenerator(['r'], D4.mul, D4.inverse)
    expect(subgroupH.e).toBe('')
    expect(subgroupH.set).toHaveLength(4)
    expect(subgroupH.set).toEqual(expect.arrayContaining(['', 'r', 'rr', 'rrr']))

    const subgroupK = fromGenerator(['s'], D4.mul, D4.inverse)
    expect(subgroupK.e).toBe('')
    expect(subgroupK.set).toHaveLength(2)
    expect(subgroupK.set).toEqual(expect.arrayContaining(['', 's']))

    const subgroupL = fromGenerator(['r', 's'], D4.mul, D4.inverse)
    expect(subgroupL.e).toBe('')
    expect(subgroupL.set).toHaveLength(8)
    expect(subgroupL.set).toEqual(expect.arrayContaining(['', 'r', 'rr', 'rrr', 's', 'sr', 'srr', 'srrr']))
  })
})