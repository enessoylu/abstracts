import { Group } from "../types/group";
import { isSubsetOf } from "./utils";

const firstSubgroupTheorem = <T>(G: Group<T>, H: T[]): boolean => {
  const H_isASubsetOf_G = isSubsetOf(H, G.set);
  const H_contains_e = H.includes(G.e)
  const H_containsEvery_hPrime = H.every(h => H.includes(G.inverse(h)))

  return H_isASubsetOf_G && H_contains_e && H_containsEvery_hPrime;
}

const secondSubgroupTheorem = <T>(G: Group<T>, H: T[]): boolean => {
  const H_isASubsetOf_G = isSubsetOf(H, G.set)
  const H_isNotEmpty = H.length > 0
  // g,h both belong to G
  const H_contains_ghPrime = H
    .flatMap(g => H.map(h => G.mul(g, G.inverse(h))))
    .every(ghPrime => H.includes(ghPrime))

  return H_isASubsetOf_G && H_isNotEmpty && H_contains_ghPrime
}


/** 
 * A subgroup N of a group G is called a normal subgroup of G if it is invariant under conjugation; that is, the conjugation (gHg') of an element of N by an element of G is always in N
 * 
 *  A subgroup H of a group G is normal if the left cosets and right cosets of H are the same. That is, H is normal if, for all g ∈ G, gH = Hg
 */
const isNormalSubgroup = <T>(G: Group<T>, H: T[]): boolean => {
  const { inverse, mul } = G;
  return G.set.every(g => H.every(h => {
    const gh = mul(g, h)
    const gPrime = inverse(g)
    const ghgPrime = mul(gh, gPrime)
    return H.includes(ghgPrime)
  }))
}

export {
  firstSubgroupTheorem,
  secondSubgroupTheorem,
  isNormalSubgroup,
}