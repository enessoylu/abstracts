/*
 *  Injection (1-1)   Surjection (Onto)  Bijection (1-1 Onto)
 *
 *   Monomorhpism        Epimorphism        Isomorphism
 * 
 * ┌─────┐  ┌─────┐   ┌─────┐  ┌─────┐   ┌─────┐  ┌─────┐
 * │     │  │     │   │     │  │     │   │     │  │     │
 * │  a ─┼──┼─►1  │   │  a ─┼──┼─►1  │   │  a ─┼──┼─►1  │
 * │     │  │     │   │     │  │     │   │     │  │     │
 * │  b ─┼──┼─►2  │   │  b ─┼──┼─►2  │   │  b ─┼──┼─►2  │
 * │     │  │     │   │     │  │     │   │     │  │     │
 * │  c ─┼──┼─►3  │   │  c ─┼──┼─►3  │   │  c ─┼──┼─►3  │
 * │     │  │     │   │     │  │  ▲  │   │     │  │     │
 * │  d ─┼──┼─►4  │   │  d ─┼──┼──┘  │   │  d ─┼──┼─►4  │
 * │     │  │     │   │     │  │     │   │     │  │     │
 * └─────┘  │  5  │   └─────┘  └─────┘   └─────┘  └─────┘
 *          └─────┘
 *
 *           Endomorphism              Automorphism
 * (not required to be surjection)
 *         ┌─────┐  ┌─────┐           ┌─────┐  ┌─────┐
 *         │     │  │     │           │     │  │     │
 *         │  a ─┼──┼─►a  │           │  a ─┼──┼─►b  │
 *         │     │  │     │           │     │  │     │
 *         │  b ─┼──┼─►b  │           │  b ─┼──┼─►a  │
 *         │     │  │     │           │     │  │     │
 *         │  c ─┼──┼─►c  │           │  c ─┼──┼─►d  │
 *         │     │  │  ▲  │           │     │  │     │
 *         │  d ─┼──┼──┘  │           │  d ─┼──┼─►c  │
 *         │     │  │  d  │           │     │  │     │
 *         └─────┘  └─────┘           └─────┘  └─────┘
 */

import { BinaryOperation, UnaryOperation } from "./basics"

// The Cancellation Law for Groups: Let (G,⋅) be a group and let a,b,c∈G. If a⋅b=a⋅c or b⋅a=c⋅a then b=c.

interface Semigroup<T> {
    readonly set: T[]
    mul: BinaryOperation<T>
}
interface Monoid<T> extends Semigroup<T> {
    e: T
}

interface Group<T> extends Monoid<T> {
    inverse: UnaryOperation<T>
}

/*
    let (G, ∗) and (H, ◦) be two groups.
    A homomorphism f, from G to H, is a map of sets f : G → H, such that f (x ∗ y) = f (x) ◦ f (y) ∀x, y ∈ G
    If G = H and f = Id G we call f the identity homomorphism.
*/
type Homomorphism<T1, T2> = (x: T1) => T2
/* A homomorphism f : G → H which is bijective is called an isomorphism. */
type Isomorphism<T1, T2> = Homomorphism<T1, T2>

/* A homomorphism from a group to itself (i.e. f : G → G) is called an endomorphism. */
type Endomorphism<T> = Homomorphism<T, T>
/* An endomorphism which is also an isomorphism is called an automorphism. */
type Automorphism<T> = Homomorphism<T, T>

// |xH| = |H|, Lagrange theorem: |H| | |G|
type Coset<T> = T[]

/** The center of a group G is the set of elements that commute with every element of G */
type Center<T> = T[]

export type {
    Automorphism,
    Center,
    Group,
    Isomorphism,
    Coset,
    Homomorphism,
} 