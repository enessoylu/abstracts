import { Group } from "../../definitions/group";
import { range } from "../utils";

export const DihedralGroupOfOrder = (order: number): Group<string> => {
  console.assert(order % 2 === 0, 'Order of dihedral should be even.')
  const set = dihedralSetOfOrder(order);
  const mul = dihedralMulOfOrder(order);
  const inverse = dihedralInverseOfOrder(order);

  return  {
    set,
    mul,
    e: '',
    inverse,
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
  const rn = 'r'.repeat(order / 2)
  const rPrime = 'r'.repeat(order / 2 - 1)
  let c = a + b;
  while (['ss', 'srs', rn, 'rs'].some(d => c.includes(d))) {
    c = c.replaceAll('ss', '')
      .replaceAll('srs', rPrime)
      .replaceAll(rn, '')
      .replaceAll('rs', rn + 'rs')
      .replaceAll(rPrime + 's', 'sr') // sr = r's
  }
  return c
}