import { Automorphism, BinaryOperation, Group, Isomorphism, UnaryOperation } from "../definitions/group";
import { permute } from "./permutation";

function checkIsomorphism<T1, T2>(G: Group<T1>, H: Group<T2>, ϕ: Isomorphism<T1, T2>) {
  if (G.set.length !== H.set.length) {
    return false;
  }

  // check bijection
  const hSet = typeof H.set === "object"
    ? Object.values(H.set)
    : H.set;

  const s = new Set(hSet)
  G.set.forEach(g => s.delete(ϕ(g)))

  if (s.size !== 0) {
    console.log(`Function is not 1-1, some elements in H are not paired: {${[...s].join(', ')}}`)
    return false;
  }

  return true;
}

function checkIdentity<T>(G: Group<T>): boolean {
  const violations: string[] = [];

  G.set.forEach(x => {
    const y = G.mul(x, G.e);
    if (y !== x) {
      violations.push(`\t${x} o e ≠ ${y}`)
    }
  })

  if (violations.length) {
    console.log(`Identity doesn't hold for:\n${violations.join('\n')}\n e = ${G.e}`)
  }

  return violations.length === 0;
}

/** checks x o inverse(x) = e for every x in the set */
function checkInverse<T>(G: Group<T>): boolean {
  const violations: string[] = [];

  G.set.forEach(x => {
    const xInv = G.inverse(x);
    if (G.mul(x, xInv) !== G.e) {
      violations.push(`\t${x} o ${x}' ≠ e, ${x}' = ${xInv}`)
    }
  })

  if (violations.length) {
    console.log(`Inverse doens't hold for:\n${violations.join('\n')}\ne = ${G.e}`)
  }

  return violations.length === 0;
}

function checkClosure<T>(G: Group<T>) {
  const violations: string[] = [];

  G.set.forEach(x => {
    G.set.forEach(y => {
      const mul = G.mul(x, y)
      if (!G.set.includes(mul)) {
        violations.push(`\t${x} o ${y} = ${mul}`)
      }
    })
  })

  if (violations.length) {
    console.log(`Set is not closed under the composition\n${violations.join('\n')}\nS = {${G.set.join(', ')}}`)
  }

  return violations.length === 0;
}

const isAbelian = isCommutative;
function isCommutative<T>(G: Group<T>): boolean {
  const violations: string[] = [];

  G.set.forEach(x => G.set.forEach(y => {
    const xoy = G.mul(x, y);
    const yox = G.mul(y, x);
    if (xoy !== yox) {
      violations.push(`\t${x} o ${y} = ${xoy}, ${y} o ${x} = ${yox}`)
    }
  }))

  if (violations.length) {
    console.log(`Group is not commutative\n${violations.join('\n')}`)
  }

  return violations.length === 0;
}

/** checks that there is only one inverse for each element in the set */
function inverseIsUnique<T>(G: Group<T>): boolean {
  const violations: string[] = []

  G.set.forEach(x => {
    const inverses = G.set.filter(y => G.mul(x, y) === G.e)
    if (inverses.length !== 1) {
      // TODO handle differently
      violations.push(`\telement ${x} has zero or more than one inverse: ${inverses.join(', ')}`)
    }
  })

  if (violations.length) {
    console.log(`Inverse's is not unique:\n${violations.join('\n')}`)
  }

  return violations.length === 0;
}

function findIdentity<T>(set: T[], mul: BinaryOperation<T>): T {
  // find e for the first item in the set
  const g = set.at(0)!;
  const ge = set.filter((item) => mul(g, item) === g);
  return ge[0];
}

function fromGenerator<T>(generatingSet: T[], mul: BinaryOperation<T>, inverse: UnaryOperation<T>): Group<T> {
  // TODO Schreier-Sims Algorithm ?
  // https://mathstrek.blog/2018/06/12/schreier-sims-algorithm/

  const set = [...generatingSet]

  for (let index = 0; index < set.length; index++) {
    const g = set[index];
    set.forEach(h => {
      const gh = mul(g, h);
      if (!set.includes(gh)) set.push(gh);
    })
  }

  const e = findIdentity(set, mul)

  return {
    e,
    set,
    mul,
    inverse
  }
}

function buildInverse<T>(group: Group<T>): UnaryOperation<T> {
  return (a: T) => group.set.find(maybe_aInverse => group.mul(a, maybe_aInverse) === group.e)!;
}

function checkGroupProperties<T>(group: Group<T>) {
  const eIsUnique = group.set.every(item => {
    const eS = group.set.filter(maybe_e => group.mul(item, maybe_e) === item);
    if (eS.length === 1) {
      return true;
    }

    console.log(`e is not unique for ${item}, ${eS.join(', ')}`);
    return false;
  });

  return eIsUnique;
}

function printTable<T extends { toString: () => string }>(group: Group<T>) {
  const table = {};
  group.set.forEach(p => table[p.toString()] = group.set.reduce((acc, pp) => {
    acc[pp.toString()] = group.mul(p, pp).toString();
    return acc;
  }, {}));
  console.table(table);
}

const setOfAllAutomorphisms = <T>(set: T[]): Automorphism<T>[] => {
  // TODO assert set is unique
  const idxMap = new Map(set.map((idx, t) => ([idx, t])))
  const permutations = permute(set)

  return permutations.map(p => a => p[idxMap.get(a)!])
}

export {
  buildInverse,
  checkClosure,
  checkGroupProperties,
  checkIdentity,
  checkInverse,
  checkIsomorphism,
  fromGenerator,
  inverseIsUnique,
  isCommutative,
  isAbelian,
  printTable,
  setOfAllAutomorphisms,
}