import { BinaryOperation, UnaryOperation } from "../types";
import { range } from "../utils";

const permute = (length: number) => {
  return permuteRec(range(length, 1))
}
const permuteRec = <T>(list: T[], acc = [], left = []): T[][] => {
  if (list.length === 1) {
    acc.push([...left, list[0]])
    return;
  }

  list.forEach(e => {
    const l = list.filter(ee => ee !== e);
    const left2 = [...left, e]
    permuteRec(l, acc, left2)
  })

  return acc;
}

class Permutation {
  private value: number[];

  constructor(value: number[]) {
    this.value = value;
  }

  static fromCycles(cyclesStr: string, length: number) {
    const value = range(length, 1);
    if (cyclesStr === '') return new Permutation(value);

    cyclesStr
      .substring(1, cyclesStr.length - 1)
      .split(')(')
      .map(s => s.split(',').map(Number))
      .filter(c => c.length > 1)
      .forEach(c => {
        c.forEach((e, idx) => {
          value[e - 1] = c[(idx + 1) % c.length]
        })
      })

    return new Permutation(value)
  }

  multiply(p: Permutation) {
    const value = [...this.value]
      .map((e) => {
        return p.value[e - 1]
      })

    return new Permutation(value);
  }

  toString() {
    const list = [...this.value].map((e, idx) => {
      const from = idx + 1;
      return from === e ? null : e;
    });
    const cycles = [];
    for (let idx = 0; idx < list.length; idx++) {
      const e = list[idx];
      if (e === null) continue;

      const from = idx + 1;
      const cycle = [from, e];

      let to = list[e - 1];
      while (to !== from) {
        cycle.push(to);
        to = list[to - 1]
      }

      cycles.push(cycle);
      cycle.forEach(e => {
        const idx = e - 1;
        list[idx] = null;
      })
    }

    return cycles.map(c => `(${c.join(',')})`).join('')
  }
}

const getPermMul = (items: Permutation[]): BinaryOperation<Permutation> => (p1: Permutation, p2: Permutation) => {
  const r = p1.multiply(p2);
  return items.find(p => p.toString() === r.toString())
}

const getPermInverse = (items: Permutation[], mul: BinaryOperation<Permutation>): UnaryOperation<Permutation> => (p: Permutation) => {
  return items.find(maybe_pPrime => mul(p, maybe_pPrime).toString() === '')
}

export {
  Permutation,
  permute,
  getPermInverse,
  getPermMul
}