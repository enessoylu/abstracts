import { Homomorphism } from "../types";
import { Group, printTable } from "./implement";

type Orbit<T> = (a: T) => T[]

/*
    f = G x A -> A 

    ∀ g, h ∈ G and ∀ a ∈ A
    g (h.a) = (g.h) a

    e.a = a for ∀ a ∈ A
*/
class Action<G, A> { // left group action
  group: Group<G>;
  set: A[];
  map: Homomorphism<[G, A], A>; // f = G x A -> A 

  constructor(group: Group<G>, set: A[], map: Homomorphism<[G, A], A>) {
    this.group = group;
    this.set = set;
    this.map = map;

    const firstPropertyHolds = this.checkFirstProperty();
    const secondPropertyHolds = this.checkSecondProperty();

    console.log(firstPropertyHolds)
    console.log(secondPropertyHolds)
  }

  orbit(a: A) {
    const A = this.set;
    const G = this.group.set;
    const map = this.map;

    return G.flatMap(g => A.map(b => [g, b] satisfies [G, A]))
      .filter(([g, b]) => map([g, b]) === a)
  }

  stabilizer(a: A) {
    const G = this.group.set;
    const map = this.map;

    return G.filter(g => map([g, a]) === a)
  }

  /* e.a = a for ∀ a ∈ A */
  checkFirstProperty() {
    const e = this.group.e;
    const A = this.set;
    return A.every(a => this.map([e, a]) === a)
  }

  /* ∀ g, h ∈ G and ∀ a ∈ A | g (h.a) = (g.h) a */
  checkSecondProperty() {
    const A = this.set;
    const G = this.group.set;
    const mul = this.group.mul;
    const map = this.map;

    return G.every(g => G.every(h => A.every(a => {
      const gh = mul(g, h);
      const ha = map([h, a]);
      return map([g, ha]) === map([gh, a])
    })))
  }

  /* g.a */
  print_ga() {
    printTable(this.group.set, this.set, (g, a) => this.map([g, a]))
  }

  /* (g.h) a */
  print_gha() {
    printTable(this.group.set, this.group.set,
      (g, h) => this.set.map(a => {
        const gh = this.group.mul(g, h)
        // console.log(gh.toString(), a)
        return a + ': ' + this.map([gh, a])
      }).join('  '))
  }
}

export {
  Action
}