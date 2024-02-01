import { Group, Permutation, permute } from "../groups"
import { Action } from "../groups/action";
import { Homomorphism } from "../types";

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

  const A = ['a', 'b']
  const map: Homomorphism<[Permutation, string], string> = ([g, a]) => {
    if (g === s3.e) return a;

    if (['(1,2,3)', '(1,3,2)'].includes(g.toString())) return a

    return a === 'b' ? 'a' : 'b'
  }
  const action = new Action(s3, A, map)
  // console.log(action.orbit('a').map(([p, a]) => p.toString() + ' ' + a))
  console.log(action.stabilizer('a').map((p) => p.toString()))
  action.print_ga()
  action.print_gha()

})
