import { Group } from "../types/group";
import { uniqueSets } from "./utils";

/** If x, y ∈ G, we say x is conjugate to y if there exists a g ∈ G such that gy = xg */
const conjugacyClassOf = <T>(x: T, G: Group<T>): T[] => {
    const conjugate = conjugacy(G)
  
    return G.set.reduce<T[]>((acc, g) => {
      const gxgPrime = conjugate(g, x);
  
      if (!acc.includes(gxgPrime)) {
        acc.push(gxgPrime)
      }
  
      return acc;
    }, [])
  }
  
  /** gives a function to get conjugacy of x, gxg' */
  const conjugacy = <T>(G: Group<T>) => {
    const inverse = G.inverse;
    const mul = G.mul;
  
    return (g: T, x: T) => {
      const gx = mul(g, x);
      const gPrime = inverse(g);
      const gxgPrime = mul(gx, gPrime);
  
      return gxgPrime
    }
  }
  
  const allConjugacyClassess = <T>(G: Group<T>) => {
    return uniqueSets(G.set.map(x => conjugacyClassOf(x, G)))
  }

  export {
    allConjugacyClassess,
    conjugacy,
    conjugacyClassOf,
  }