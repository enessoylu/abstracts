import { describe, expect, test } from "vitest";
import { fromGenerator } from "../groups/group";
import { CyclicGroupOf } from "../groups/varieties/cyclic";
import { DihedralGroupOfOrder } from "../groups/varieties/dihedral";

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