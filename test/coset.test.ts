import { expect, test } from "vitest";
import { SymmetricGroupOf } from "../groups/varieties/symmetric";
import { fromGenerator } from "../groups/group";
import { areDisjointSets, isSetFormedByPartitions, uniqueSets } from "../groups/utils";
import { leftCosetOf, rightCosetOf, indexOfSubgroup } from "../groups/properties/coset";

// Let G be a group and H a subgroup. Then the left cosets of H in G partition G
test('left cosets of H partition G', () => {
  const G = SymmetricGroupOf(4)
  const H = fromGenerator(['(1,2)'], G.mul, G.inverse)

  const leftCosets = G.set.map(g => leftCosetOf(H, g))

  // any two cosets are either identical or disjoint.
  const uniqueLeftCosets = uniqueSets(leftCosets)

  // G is the disjoint union of the left cosets gH for all g œ G.
  expect(areDisjointSets(uniqueLeftCosets)).toBe(true);

  expect(isSetFormedByPartitions(G.set, uniqueLeftCosets))
})

test('number of left and right cosets are equal', () => {
  const G = SymmetricGroupOf(4)
  const H = fromGenerator(['(1,2)'], G.mul, G.inverse)

  const leftCosets = G.set.map(g => leftCosetOf(H, g))
  const rightCosets = G.set.map(g => rightCosetOf(H, g))

  const uniqueLeftCosets = uniqueSets(leftCosets)
  const uniqueRightCosets = uniqueSets(rightCosets)

  expect(uniqueLeftCosets.length).toBe(uniqueRightCosets.length)
})

// |G| = |H|[G : H]
test('order of set equals to order of subgroup times index of subgroup', () => {
  const G = SymmetricGroupOf(4)
  const H = fromGenerator(['(1,2)'], G.mul, G.inverse)

  const index = indexOfSubgroup(G, H);

  expect(G.set.length).toBe(H.set.length * index)
})
