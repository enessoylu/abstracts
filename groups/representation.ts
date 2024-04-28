import { Field } from "../types/field"
import { GL, VectorSpace } from "../types/representation"

/** The automorphism group of an object X is the group consisting of automorphisms of X under composition of morphisms.
* If instead X is a group, then its automorphism group Aut(X) is the group consisting of all group automorphisms of X.
*/
type GL2 = GL<VectorSpace<[number, number], Field<number>>>
type GLnF = GL<number, Field<number>>