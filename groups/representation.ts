import { Field } from "../definitions/field"
import { GL, VectorSpace } from "../definitions/representation"

type VectorSpace2 = VectorSpace<[number, number], Field<number>>
/** The automorphism group of an object X is the group consisting of automorphisms of X under composition of morphisms.
* If instead X is a group, then its automorphism group Aut(X) is the group consisting of all group automorphisms of X.
*/
type GL2 = GL<VectorSpace2>
