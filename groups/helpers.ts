import { BinaryOperation, Group, UnaryOperation } from '../types'

const fromGenerator = <T>(generatingSet: T[], mul: BinaryOperation<T>) => {
  // TODO Schreier-Sims Algorithm
  // https://mathstrek.blog/2018/06/12/schreier-sims-algorithm/
}
const find_e = <T>(group: Group<T>): T => {
  // find e for the first item in the set
  const g = group.set.at(0);
  const goe = group.set.filter((item) => group.mul(g, item) === g);
  return goe[0];
}

const buildInverse  = <T>(group: Group<T>): UnaryOperation<T> => {
  return (a: T) => group.set.find(maybe_aInverse => group.mul(a, maybe_aInverse) === group.e)
}

const validate = <T>(group: Group<T>) => {
  const eIsUnique = group.set.every(item => {
    const eS = group.set.filter(maybe_e => group.mul(item, maybe_e) === item)
    if (eS.length === 1) {
      return true;
    }

    console.log(`e is not unique for ${item}, ${eS.join(', ')}`)
    return false;
  })

  return eIsUnique;
}

const printGroup = <T>(group: Group<T>) => {
  return `Set ${group.set.join(', ')}\n\te ${group.e}`
}

const printTable = <T>(group: Group<T>) => {
  const table = {}
  group.set.forEach(p => table[p.toString()] = group.set.reduce((acc, pp) => {
    acc[pp.toString()] = group.mul(p, pp).toString()
    return acc;
  }, {}))
  console.table(table)
}

export {
  buildInverse,
  find_e,
  printGroup,
  printTable,
  validate
}