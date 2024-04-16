import { expect, test } from "vitest";
import { SymmetricGroupOf } from "../groups/symmetric";
import { Group } from "../types/group";
import { fromCycles, inverseOfPermutation, multiply, toCycleString } from "../groups/permutation";
import { printTable } from "../groups/group";
import { DihedralGroupOfOrder } from "../groups/dihedral";
import { firstSubgroupTheorem, isNormalSubgroup, secondSubgroupTheorem } from "../groups/subgroup";

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

  expect(firstSubgroupTheorem(S3, sub_items)).toBe(true)
  expect(secondSubgroupTheorem(S3, sub_items)).toBe(true)
  expect(isNormalSubgroup(S3, sub_items)).toBe(true)
})

test('Subgroup of rotations of an n-gon is normal in dihedral group Dn', () => {
  const D4 = DihedralGroupOfOrder(8);
  const sub_items = ['', 'r', 'rr', 'rrr']

  printTable(D4)

  expect(firstSubgroupTheorem(D4, sub_items)).toBe(true)
  expect(secondSubgroupTheorem(D4, sub_items)).toBe(true)
  expect(isNormalSubgroup(D4, sub_items)).toBe(true)
})