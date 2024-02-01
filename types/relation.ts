/* A binary relation (∼) over sets X and Y is a set of ordered pairs (x, y) consisting of elements x in X and y in Y. It encodes the common concept of relation: an element x is related to an element y, if and only if the pair (x, y) belongs to the set of ordered pairs that defines the binary relation. */
type BinaryRelation<T1, T2> = [T1, T2][]

/*  homogeneous relation (also called endorelation) on a set X is a binary relation between X and itself, i.e. it is a subset of the Cartesian product X × X */
type HomogeneousRelation<T> = BinaryRelation<T, T>

/* ReflexiveRelation: A homogeneous binary relation R on a set X is reflexive if it relates every element of X to itself */
type ReflexiveRelation<T> = HomogeneousRelation<T>

/* SymmetricRelation: Formally, a binary relation R over a set X is symmetric if:
  ∀a,b ∈ X(aRb ⇐⇒ bRa) | where the notation aRb means that (a,b) ∈ R
*/
type SymmetricRelation<T1, T2> = BinaryRelation<T1, T2>

/* TransitiveRelation: A relation R on a set X is transitive if, for all elements a, b, c in X, whenever R relates a to b and b to c, then R also relates a to c. */
type TransitiveRelation<T1, T2> = BinaryRelation<T1, T2>

/* EquivalenceRelation: A binary relation that is reflexive, symmetric and transitive. */
type EquivalenceRelation<T> = HomogeneousRelation<T>

/* EquivalenceClass: An equivalence relation may split the set S into equivalence classes. These equivalence classes are constructed so that elements a and b belong to the same equivalence class if, and only if, they are equivalent.

On the set X={a,b,c},

the relation R={(a,a),(b,b),(c,c),(b,c),(c,b)}} is an equivalence relation. The following sets are equivalence classes of this relation:

 [a]={a}, [b]=[c]={b,c}

 The set of all equivalence classes for R is {{a},{b,c}}.This set is a partition of the set X with respect to R. */
 
 /* The basic idea of an invariant is that it is a property or feature of a system that remains constant, regardless of the specific details or transformations of the system. The purpose of this concept is to identify and understand these constant properties, which can then be used to make general statements and predictions about the system as a whole.

Invariants are useful in many areas of mathematics, including algebra, geometry, and physics, as they allow for simplification and a deeper understanding of complex systems. */
type EquivalenceClasses<T> = T[][]

type FormPartition<T> = (set: T[]) => (rel: EquivalenceRelation<T>) => EquivalenceClasses<T>

export {
  EquivalenceRelation
}