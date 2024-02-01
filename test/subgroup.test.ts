import { Group, Permutation, permute } from "../groups"

const getPermMul = (items: Permutation[]) => (p1: Permutation, p2: Permutation) => {
  const r = p1.multiply(p2);
  return items.find(p => p.toString() === r.toString())
}

test('Actions', () => {
  const perm3 = permute(3)

  const items = perm3.map(p => new Permutation(p))
  const e = items.find(p => p.toString() === '')
  const mul = getPermMul(items)
  const s3 = new Group(items, mul, { e })

  // s3.printTable()

  const sub_items = [
    Permutation.fromCycles('(1,2,3)', 3),
    Permutation.fromCycles('(1,3,2)', 3),
    Permutation.fromCycles('', 3),
  ]
  const sub_mul = getPermMul(sub_items)
  const sub_e = sub_items.find(p => p.toString() === '');
  const sub_s3 = new Group(sub_items, sub_mul, { e: sub_e })

  // sub_s3.printTable()
})
