import { Field } from "../definitions/field";
import { VectorSpace } from "../definitions/representation";
import { range } from "./utils";

type Matrices<F extends Field<any>> = F extends Field<infer T> ? VectorSpace<T[][], F> : never
type Matrix<M extends Matrices<any>> = M['set'][0]

const ADDITIVE_IDENTITY = 0; // hardcoded for F=R

const R: Field<number> = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  div: (a, b) => a / b,
  mul: (a, b) => a * b,
}
const multiplier = <F extends Field<any>>(field: F) => (A: Matrix<Matrices<F>>, B: Matrix<Matrices<F>>) => {
  const c: F[][] = A.map(_ => [])

  const p = B.length;
  const n = A[0].length;
  const m = A.length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < p; j++) {
      c[i][j] = range(n).reduce((c_ij, k) => {
        const A_ik = A[i][k]
        const B_kj = B[k][j]
        const sum = field.mul(A_ik, B_kj)
        return field.add(sum, c_ij)
      }, ADDITIVE_IDENTITY as unknown as F)
    }
  }

  return c;
}

const inverseOf2by2 = <F extends Field<any>>(field: F) => (A: Matrix<Matrices<F>>) => {
  const [a, b] = A[0]
  const [c, d] = A[1]

  const bNeg = field.mul(-1, b)
  const cNeg = field.mul(-1, c)

  const deter = det(field)(A)

  return [
    [d, bNeg].map(e => field.div(e, deter)),
    [cNeg, a].map(e => field.div(e, deter)),
  ]
}

/** only works for 2x2 */
const det = <F extends Field<any>>(field: F) => (A: Matrix<Matrices<F>>) => {
  const [a, b] = A[0]
  const [c, d] = A[1]

  const ad = field.mul(a, d)
  const bc = field.mul(b, c)

  return field.sub(ad, bc)
}

export {
  R,
  Matrix,
  Matrices,
  multiplier,
  inverseOf2by2,
}