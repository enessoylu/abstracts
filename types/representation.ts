import { Matrices, Matrix } from "../groups/matrix";
import { Field } from "./field";
import { Automorphism, BinaryOperation, Group, Homomorphism } from "./group"

type VectorSpace<V, F extends Field<any>> = {
  set: V[];
  field: F

  adition: BinaryOperation<V>
  scalarMultiplication: (a: F extends Field<infer T> ? T : never, v: V) => V
}

/**
  GL(V) General linear group of a vector space

  Given a vector space V over a field F, the general linear group is written as GL(V) or Aut(V) and is the group of all automorphisms of V together with functional composition as the group operation.
 */
type GL<VSor_n extends VectorSpace<any, any> | number, For_void = {}> =
  VSor_n extends VectorSpace<infer V, any> ? Group<Automorphism<V>> : (For_void extends Field<any> ? Group<Matrices<For_void>> : never)

/** 
  GL(n, F) General linear group of degree n is the set of n×n invertible matrices together with ordinary Matrix multiplication.

  Where F is the field from which the entries of the matrices are taken.
*/

/**
  If V is a vector space over a field F with finite dimension n, then GL(n,F) and GL(V) are isomorphic
 
  GL(n, F) ≅ GL(V)
*/

/** A representation of a group G on a vector space V over a field F
is a group homomorphism from G to GL(V) */
type Representation = Homomorphism<Group<any>, GL<any>>

export {
  VectorSpace,
  Representation,
  GL,
}