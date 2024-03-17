import { Permutation, permute, printTable } from "../groups"
import { BinaryOperation, Group, UnaryOperation } from "../types";

const getPermMul = (items: Permutation[]): BinaryOperation<Permutation> => (p1: Permutation, p2: Permutation) => {
  const r = p1.multiply(p2);
  return items.find(p => p.toString() === r.toString())
}

const getPermInverse = (items: Permutation[], mul: BinaryOperation<Permutation>): UnaryOperation<Permutation> => (p: Permutation) => {
  return items.find(maybe_pPrime => mul(p, maybe_pPrime).toString() === '')
}

test('Subgroups', () => {
  const perm3 = permute(3)

  const items = perm3.map(p => new Permutation(p))
  const e = items.find(p => p.toString() === '')
  const mul = getPermMul(items)
  const inverse = getPermInverse(items, mul);

  const s3: Group<Permutation> = new (class implements Group<Permutation> {
    set = items;
    e = e

    inverse = inverse
    mul = mul
  })

  printTable(s3)

  const sub_items = [
    Permutation.fromCycles('(1,2,3)', 3),
    Permutation.fromCycles('(1,3,2)', 3),
    Permutation.fromCycles('', 3),
  ]
  const sub_mul = getPermMul(sub_items)
  const sub_inverse = getPermInverse(sub_items, sub_mul);
  const sub_e = sub_items.find(p => p.toString() === '');
  const sub_s3: Group<Permutation> = new (class implements Group<Permutation> {
    e = sub_e
    set = sub_items

    inverse = sub_inverse;
    mul = sub_mul
  })

  printTable(sub_s3)
})
