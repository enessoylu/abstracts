import { Field } from "./field";
import { Automorphism, BinaryOperation, Group } from "./group"

type Matrix<F extends Field<any>> = F extends Field<infer T> ? T[][] : never

type VectorSpace<V, F> = {
  set: V[];
  field: F extends Field<infer T> ? T : Field<F>

  adition: BinaryOperation<V>
  scalarMultiplication: (a: F extends Field<infer T> ? T : Field<F>, v: V) => V
}

/**
  GL(V) General linear group of a vector space

  Given a vector space V over a field F, the general linear group is written as GL(V) or Aut(V) and is the group of all automorphisms of V together with functional composition as the group operation.
 */
type GL<VS extends VectorSpace<any, any> | Matrix<any>> =
  VS extends Matrix<infer F> ? (F extends Field<infer T> ? Group<T[][]> : never) :
  VS extends VectorSpace<infer V, any> ? Group<Automorphism<V>> : never

/** 
  GL(n, F) General linear group of degree n is the set of n×n invertible matrices together with ordinary Matrix multiplication.

  Where F is the field from which the entries of the matrices are taken.
*/

/**
  If V is a vector space over a field F with finite dimension n, then GL(n,F) and GL(V) are isomorphic
 
  GL(n, F) ≅ GL(V)
  */

type Vector<F> = F[]
type V2 = Vector<[number, number]>

export {
  VectorSpace,
  Vector,
  Matrix,
  V2,
  GL,
}