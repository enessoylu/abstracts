import { expect, test } from "vitest";
import { Field, Matrix } from "../types/representation";
import { range } from "../groups/utils";

const ADDITIVE_IDENTITY = 0; // hardcoded for F=R

/** for square matrices */
const multiplier = <F extends Field<any>> (field: F) => (a: Matrix<F>, b: Matrix<F>) => {
  const c: F[][] = a.map(_ => [])

  const p = b.length;
  const n = a[0].length;
  const m = a.length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < p; j++) {
      c[i][j] = range(n).reduce((c_ij, k) => {
        const sum = field.multiplication(a[i][k], b[k][j])
        return field.addition(sum, c_ij)
      }, ADDITIVE_IDENTITY as unknown as F)
    }
  }

  return c;
}

test('matrix multiplication', () => {
  const R: Field<number> = {
    set: [],
    addition: (a, b) => a + b,
    subtraction: (a, b) => a - b,
    division: (a, b) => a / b,
    multiplication: (a, b) => a * b,
  }

  const multiply = multiplier(R)

  const a = [
    [1, 0, 0],
    [2, 2, 0],
    [3, 0, 3],
  ]
  const b = [
    [1, 0, 0],
    [0, 2, 0],
    [0, 0, 1],
  ]
  const c = [
    [1, 0, 0],
    [2, 4, 0],
    [3, 0, 3],
  ]
  expect(multiply(a, b)).toMatchObject(c)
})