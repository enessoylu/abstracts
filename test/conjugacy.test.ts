import { expect, test } from "vitest";
import { areDisjointSets, isSetFormedByPartitions } from "../groups/utils";
import { allConjugacyClassess } from "../groups/properties/conjugacy";
import { DihedralGroupOfOrder } from "../groups/varieties/dihedral";

const D4 = DihedralGroupOfOrder(8)
const conjugacyClassess = allConjugacyClassess(D4)

test('The conjugacy classes of a group are disjoint', () => {
  expect(areDisjointSets(conjugacyClassess)).toBe(true)
})

test('The union of all the conjugacy classes forms the group', () => {
  expect(isSetFormedByPartitions(D4.set, conjugacyClassess)).toBe(true)
})

