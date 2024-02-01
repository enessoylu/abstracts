import type { BinaryOperation, Group as IGroup, UnaryOperation } from '../types'

class Group<T> implements IGroup<T> {
  set: T[];
  e: T;

  mul: BinaryOperation<T>;
  inverse: UnaryOperation<T>;

  static fromGenerator<T>(generatingSet: T[], mul: BinaryOperation<T>) {
    // TODO Schreier-Sims Algorithm
    // https://mathstrek.blog/2018/06/12/schreier-sims-algorithm/
  }

  constructor(items: T[], mul: BinaryOperation<T>, {verbose = false , e = undefined} = {}) {
    this.set = [...items];
    this.mul = mul;
    this.e = e ? e : this.find_e();
    this.inverse = this.buildInverse();

    this.validate(verbose);
  }

  private find_e(): T {
    // find e for the first item in the set
    const g = this.set.at(0);
    const goe = this.set.filter((item) => this.mul(g, item) === g);
    return goe[0];
  }

  private buildInverse(): UnaryOperation<T> {
    return (a: T) => this.set.find(maybe_aInverse => this.mul(a, maybe_aInverse) === this.e)
  }

  private validate(verbose = false) {
    const eIsUnique = this.set.every(item => {
      const eS = this.set.filter(maybe_e => this.mul(item, maybe_e) === item)
      if (eS.length === 1) {
        return true;
      }
      if (verbose) {
        console.log(`e is not unique for ${item}, ${eS.join(', ')}`)
      }
      return false;
    })

    return eIsUnique;
  }

  toString() {
    return `Set ${this.set.join(', ')}\n\te ${this.e}`
  }

  printTable() {
    printTable(this.set, this.set, this.mul)
  }
}

const printTable = <T, U>(left: T[], right: U[], mul: BinaryOperation<T, U>) => {
  const table = {}
  left.forEach(p => table[p.toString()] = right.reduce((acc, pp) => {
    acc[pp.toString()] = mul(p, pp).toString()
    return acc;
  }, {}))
  console.table(table)
}

export {
  Group,
  printTable
}