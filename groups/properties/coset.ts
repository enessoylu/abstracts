import { Coset, Group } from "../../definitions/group"
import { uniqueSets } from "../utils"

/** gH = {gh : h an element of H} for g in G. */
const leftCosetOf = <T>(H: Group<T>, g: T): Coset<T> => {
  return H.set.map(h => H.mul(h, g))
}

/** Hg = {hg : h an element of H} for g in G. */
const rightCosetOf = <T>(H: Group<T>, g: T): Coset<T> => {
  return H.set.map(h => H.mul(g, h))
}

/** The index of H in G, written [G : H], is the number of left (or right) cosets of H in G if this number is finite. */
const indexOfSubgroup =  <T>(G: Group<T>, H: Group<T>) => {
  const leftCosets = G.set.map(g => leftCosetOf(H, g))

  // any two cosets are either identical or disjoint.
  const uniqueLeftCosets = uniqueSets(leftCosets)
  return uniqueLeftCosets.length;
}

export {
  leftCosetOf,
  rightCosetOf,
  indexOfSubgroup,
}