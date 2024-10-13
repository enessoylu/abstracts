import { Map } from "../../definitions/basics"
import { FinitFieild } from "../../definitions/field";
import { Group } from "../../definitions/group";
import { VectorSpace } from "../../definitions/linear_algebra";

type R2 = [number, number]

/** A linear transformation is a function between two vector spaces that preserves both vector addition and scalar multiplication */
type LinearTranformation<V, W = V> = Map<
    VectorSpace<V, FinitFieild<number>>,
    VectorSpace<W, FinitFieild<number>>
>

/** An isometry is a specific type of transformation that preserves distances between all points.
 * 
 * In linear algebra, orthogonal transformations (such as rotations and reflections) are examples of isometries that preserve both distances and angles.
 * - translation
 * - rotation
 * - reflection
 * - glide reflection
 * */
 type Isometry<V, W = V> = LinearTranformation<V, W>;
 /* 𝑇 is an isometry if for any two vectors 𝑢 and 𝑣 :
     ‖𝑇(𝑢) − 𝑇(𝑣)‖ = ‖𝑢 − 𝑣‖, ‖⋅‖ denotes the distance (or norm) in the vector space.
     In other words, the distance between two vectors remains the same after the transformation.
 */

/*
Let X be a set equipped with a binary operation + (abstract addition), and let t∈X be a fixed element.
The translation vector t is the element that, when added to any element x∈X, produces the translation of x by t.
*/
type V = R2 // translation vector
type W = Isometry<R2>

type Symmetry = [V, W];

type SymmetryGroup = Group<Symmetry>
