import { Group, Homomorphism } from "../types/group";

type Orbit<T> = (a: T) => T[]

/*
    f = G x A -> A 

    ∀ g, h ∈ G and ∀ a ∈ A
    g (h.a) = (g.h) a

    e.a = a for ∀ a ∈ A
*/
interface Action<G, A> { // left group action
  group: Group<G>;
  set: A[];
  map: Homomorphism<[G, A], A>; // f = G x A -> A 
}

const orbit = <G, A>(a: A, action: Action<G, A>) => {
  const A = action.set;
  const G = action.group.set;
  const map = action.map;

  return G.flatMap(g => A.map(b => [g, b] satisfies [G, A]))
    .filter(([g, b]) => map([g, b]) === a)
}

const stabilizer = <G, A>(a: A, action: Action<G, A>) =>  {
  const G = action.group.set;
  const map = action.map;

  return G.filter(g => map([g, a]) === a)
}

/* e.a = a for ∀ a ∈ A */
const checkFirstProperty = <G, A>(action: Action<G, A>) => {
  const e = action.group.e;
  const A = action.set;
  return A.every(a => action.map([e, a]) === a)
}

/* ∀ g, h ∈ G and ∀ a ∈ A | g.(h.a) = (g.h).a */
const checkSecondProperty = <G, A>(action: Action<G, A>) => {
  const A = action.set;
  const G = action.group.set;
  const mul = action.group.mul;
  const map = action.map;

  return G.every(g => G.every(h => A.every(a => {
    const gh = mul(g, h);
    const ha = map([h, a]);
    const g_ha = map([g, ha]);
    const gh_a = map([gh, a])

    return g_ha === gh_a;
  })))
}

export {
  Action,
  checkFirstProperty,
  checkSecondProperty,
}