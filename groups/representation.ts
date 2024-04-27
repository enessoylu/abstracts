import { Field } from "../types/field";
import { Matrix } from "../types/representation";
import { range } from "./utils";

const ADDITIVE_IDENTITY = 0; // hardcoded for F=R

const R: Field<number> = {
  addition: (a, b) => a + b,
  subtraction: (a, b) => a - b,
  division: (a, b) => a / b,
  multiplication: (a, b) => a * b,
}

const multiplier = <F extends Field<any>> (field: F) => (A: Matrix<F>, B: Matrix<F>) => {
  const c: F[][] = A.map(_ => [])

  const p = B.length;
  const n = A[0].length;
  const m = A.length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < p; j++) {
      c[i][j] = range(n).reduce((c_ij, k) => {
        const A_ik = A[i][k]
        const B_kj = B[k][j]
        const sum = field.multiplication(A_ik, B_kj)
        return field.addition(sum, c_ij)
      }, ADDITIVE_IDENTITY as unknown as F)
    }
  }

  return c;
}

const inverseOf2by2 =  <F extends Field<any>> (field: F) => (A: Matrix<F>) => {
  const [a, b] = A[0]
  const [c, d] = A[1]

  const bNeg = field.multiplication(-1, b)
  const cNeg = field.multiplication(-1, c)

  const deter = det(field)(A)

  return [
    [d, bNeg].map(e => field.division(e, deter)),
    [cNeg, a].map(e => field.division(e, deter)),
  ]
}

/** only works for 2x2 */
const det =  <F extends Field<any>> (field: F) => (A: Matrix<F>) => {
  const [a, b] = A[0]
  const [c, d] = A[1]

  const ad = field.multiplication(a, d)
  const bc = field.multiplication(b, c)

  return field.subtraction(ad, bc)
}

export {
  R,
  multiplier,
  inverseOf2by2,
}