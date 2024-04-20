import { expect, test } from "vitest"
import { permute } from "../groups/permutation"
import { setOfAllAutomorphisms } from "../groups/group"

test('setOfAllAutomorphisms', () => {
  const S = ['a', 'b', 'c']
  const automorphisms = setOfAllAutomorphisms(S)
  const images = automorphisms.map(aut => S.map(s => aut(s)))

  expect(images).toMatchObject(permute(S))
})