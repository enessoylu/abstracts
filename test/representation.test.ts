import { test } from "vitest"
import { printTable } from "../groups/group"
import { GL, Matrix } from "../types/representation"
import { R, inverseOf2by2, multiplier } from "../groups/representation"

/** The automorphism group of an object X is the group consisting of automorphisms of X under composition of morphisms.
* If instead X is a group, then its automorphism group Aut(X) is the group consisting of all group automorphisms of X.
*/

test('GL', () => {
  const id = 
    [[1, 0],
     [0, 1]]
  const set = [
    id,
  ]

  const GL: GL<Matrix<typeof R>> = {
    e: id,
    set,
    mul: multiplier(R),
    inverse: inverseOf2by2(R)
  }

  printTable(GL)
}) 