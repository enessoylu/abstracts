import { Automorphism, Group, Homomorphism } from "./group"
import { VectorSpace } from "./linear_algebra"


/**
  GL(V) General linear group of a vector space

  Given a vector space V over a field F, the general linear group is written as GL(V) or Aut(V) and is the group of all automorphisms of V together with functional composition as the group operation.
 */
type GL<V extends VectorSpace<any, any>> = Group<Automorphism<V>>

/** 
  GL(n, F) General linear group of degree n is the set of n×n invertible matrices together with ordinary Matrix multiplication.

  Where F is the field from which the entries of the matrices are taken.
*/
type GLn<Matrices> = Group<Matrices>

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
  GLn,
}