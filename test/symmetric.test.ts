import { Permutation, permute } from "../groups";

test('permute', () => {
  const twoPerm = permute(2)
  expect(twoPerm).toHaveLength(2)
  expect(twoPerm).toMatchObject([[1, 2], [2, 1]])

  const threePerm = permute(3)
  expect(threePerm).toHaveLength(6)
  expect(threePerm).toMatchObject([
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ])

  const fourPerm = permute(4)
  expect(fourPerm).toHaveLength(24)
  expect(fourPerm).toMatchObject([
    [1, 2, 3, 4],
    [1, 2, 4, 3],
    [1, 3, 2, 4],
    [1, 3, 4, 2],
    [1, 4, 2, 3],
    [1, 4, 3, 2],
    [2, 1, 3, 4],
    [2, 1, 4, 3],
    [2, 3, 1, 4],
    [2, 3, 4, 1],
    [2, 4, 1, 3],
    [2, 4, 3, 1],
    [3, 1, 2, 4],
    [3, 1, 4, 2],
    [3, 2, 1, 4],
    [3, 2, 4, 1],
    [3, 4, 1, 2],
    [3, 4, 2, 1],
    [4, 1, 2, 3],
    [4, 1, 3, 2],
    [4, 2, 1, 3],
    [4, 2, 3, 1],
    [4, 3, 1, 2],
    [4, 3, 2, 1],
  ])
})

test('Permutation', () => {
  expect(new Permutation([1, 2, 3, 4]).toString()).toBe('')
  expect(new Permutation([1, 2, 4, 3]).toString()).toBe('(3,4)')
  expect(new Permutation([1, 3, 2, 4]).toString()).toBe('(2,3)')
  expect(new Permutation([1, 3, 2, 4]).toString()).toBe('(2,3)')
  expect(new Permutation([1, 3, 4, 2]).toString()).toBe('(2,3,4)')
  expect(new Permutation([1, 4, 2, 3]).toString()).toBe('(2,4,3)')
  expect(new Permutation([1, 4, 3, 2]).toString()).toBe('(2,4)')
  expect(new Permutation([2, 1, 3, 4]).toString()).toBe('(1,2)')
  expect(new Permutation([2, 1, 4, 3]).toString()).toBe('(1,2)(3,4)')
  expect(new Permutation([2, 3, 1, 4]).toString()).toBe('(1,2,3)')
  expect(new Permutation([2, 3, 4, 1]).toString()).toBe('(1,2,3,4)')
  expect(new Permutation([2, 4, 1, 3]).toString()).toBe('(1,2,4,3)')
  expect(new Permutation([2, 4, 3, 1]).toString()).toBe('(1,2,4)')
  expect(new Permutation([3, 1, 2, 4]).toString()).toBe('(1,3,2)')
  expect(new Permutation([3, 1, 4, 2]).toString()).toBe('(1,3,4,2)')
  expect(new Permutation([3, 2, 1, 4]).toString()).toBe('(1,3)')
  expect(new Permutation([3, 2, 4, 1]).toString()).toBe('(1,3,4)')
  expect(new Permutation([3, 4, 1, 2]).toString()).toBe('(1,3)(2,4)')
  expect(new Permutation([3, 4, 2, 1]).toString()).toBe('(1,3,2,4)')
  expect(new Permutation([4, 1, 2, 3]).toString()).toBe('(1,4,3,2)')
  expect(new Permutation([4, 1, 3, 2]).toString()).toBe('(1,4,2)')
  expect(new Permutation([4, 2, 1, 3]).toString()).toBe('(1,4,3)')
  expect(new Permutation([4, 2, 3, 1]).toString()).toBe('(1,4)')
  expect(new Permutation([4, 3, 1, 2]).toString()).toBe('(1,4,2,3)')
  expect(new Permutation([4, 3, 2, 1]).toString()).toBe('(1,4)(2,3)')

  expect(Permutation.fromCycles('(1,2,3)', 3).toString()).toBe('(1,2,3)')
  expect(Permutation.fromCycles('(1,2)(3)', 3).toString()).toBe('(1,2)')
  expect(Permutation.fromCycles('(1,2)(4,3)', 4).toString()).toBe('(1,2)(3,4)')

  const p1 = Permutation.fromCycles('(1,2)', 4) 
  const p2 = Permutation.fromCycles('(3,4)', 4) 
  const p3 = Permutation.fromCycles('', 4)

  expect(p1.multiply(p2).toString()).toBe('(1,2)(3,4)')
  expect(p2.multiply(p3).toString()).toBe('(3,4)')
  expect(p1.multiply(p3).toString()).toBe('(1,2)')
})