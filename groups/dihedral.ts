// n rotations n reflections
// r rotation s reflection, rsr = s, ss = e, rr... = e 
// s,t are adjacent axes of symmetry on n-gon, st is a rotation
// s = rf, t = f, st = rff
import { Group } from "../types/group";
import { range } from "../utils";

export const DihedralGroupOfOrder = (order: number) => {
  const set = dihedralSetOfOrder(order);
  const mul = dihedralMulOfOrder(order);
  const inverse = dihedralInverseOfOrder(order);

  return class implements Group<string> {
    set = set;
    mul = mul;
    e = '';
    inverse = inverse
  }
}

export const dihedralInverseOfOrder = (order: number) => (a: string): string => {
  const mul = dihedralMulOfOrder(order)
  const aSimplified = mul(a, '');
  const num_r = aSimplified.match(/r/g)?.length ?? 0;
  const num_s = aSimplified.match(/s/g)?.length ?? 0;
  return mul('r'.repeat(order / 2 - num_r), 's'.repeat(num_s))
}

export const dihedralSetOfOrder = (order: number) => {
  const set = [''];
  // rotations
  range(order / 2 - 1, 1).map(n => set.push('r'.repeat(n)))
  // rotation + reflection
  range(order / 2).map(n => set.push('s' + 'r'.repeat(n)))

  return set;
}

export const dihedralMulOfOrder = (order: number) => (a: string, b: string): string => {
  let c = a + b + 'r'.repeat(order / 2) // extra r's for rs;
  const rn = 'r'.repeat(order / 2)
  while (['ss', 'rsr', rn].some(d => c.includes(d))) {
    c = c.replaceAll('ss', '')
      .replaceAll('rsr', 's')
      .replaceAll(rn, '')
  }
  return c
}