import { expect, test } from "vitest";
import { asTransposes, fromCycles, multiply, permute, toCycleString } from "../groups/permutation";

test('permute', () => {
  expect(permute(0)).toHaveLength(0)
  expect(permute(1)).toHaveLength(1)
  expect(permute(2)).toHaveLength(2)
  expect(permute(3)).toHaveLength(6)
  expect(permute(4)).toHaveLength(24)

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
  expect(toCycleString([1, 2, 3, 4])).toBe('')
  expect(toCycleString([1, 2, 4, 3])).toBe('(3,4)')
  expect(toCycleString([1, 3, 2, 4])).toBe('(2,3)')
  expect(toCycleString([1, 3, 2, 4])).toBe('(2,3)')
  expect(toCycleString([1, 3, 4, 2])).toBe('(2,3,4)')
  expect(toCycleString([1, 4, 2, 3])).toBe('(2,4,3)')
  expect(toCycleString([1, 4, 3, 2])).toBe('(2,4)')
  expect(toCycleString([2, 1, 3, 4])).toBe('(1,2)')
  expect(toCycleString([2, 1, 4, 3])).toBe('(1,2)(3,4)')
  expect(toCycleString([2, 3, 1, 4])).toBe('(1,2,3)')
  expect(toCycleString([2, 3, 4, 1])).toBe('(1,2,3,4)')
  expect(toCycleString([2, 4, 1, 3])).toBe('(1,2,4,3)')
  expect(toCycleString([2, 4, 3, 1])).toBe('(1,2,4)')
  expect(toCycleString([3, 1, 2, 4])).toBe('(1,3,2)')
  expect(toCycleString([3, 1, 4, 2])).toBe('(1,3,4,2)')
  expect(toCycleString([3, 2, 1, 4])).toBe('(1,3)')
  expect(toCycleString([3, 2, 4, 1])).toBe('(1,3,4)')
  expect(toCycleString([3, 4, 1, 2])).toBe('(1,3)(2,4)')
  expect(toCycleString([3, 4, 2, 1])).toBe('(1,3,2,4)')
  expect(toCycleString([4, 1, 2, 3])).toBe('(1,4,3,2)')
  expect(toCycleString([4, 1, 3, 2])).toBe('(1,4,2)')
  expect(toCycleString([4, 2, 1, 3])).toBe('(1,4,3)')
  expect(toCycleString([4, 2, 3, 1])).toBe('(1,4)')
  expect(toCycleString([4, 3, 1, 2])).toBe('(1,4,2,3)')
  expect(toCycleString([4, 3, 2, 1])).toBe('(1,4)(2,3)')

  expect(toCycleString(fromCycles('(1,2,3)'))).toBe('(1,2,3)')
  expect(toCycleString(fromCycles('(1,2)(3)'))).toBe('(1,2)')
  expect(toCycleString(fromCycles('(1,2)(4,3)'))).toBe('(1,2)(3,4)')
  expect(toCycleString(fromCycles('(1,3)(1,2)'))).toBe('(1,2,3)')
  expect(toCycleString(fromCycles('(1,2)(2,3)'))).toBe('(1,2,3)')

  const p1 = fromCycles('(1,2)') 
  const p2 = fromCycles('(3,4)') 
  const p3 = fromCycles('')

  const p1p2 = multiply(p1, p2)
  const p2p3 = multiply(p2, p3)
  const p1p3 = multiply(p1, p3)

  expect(multiply(p1, p2))
  expect(toCycleString(p1p2)).toBe('(1,2)(3,4)')
  expect(toCycleString(p2p3)).toBe('(3,4)')
  expect(toCycleString(p1p3)).toBe('(1,2)')
})

test('as transposes', () => {
  expect(asTransposes('')).toBe('')
  expect(asTransposes('(1,2)')).toBe('(1,2)')
  expect(asTransposes('(1,2)(3,4)')).toBe('(1,2)(3,4)')
  expect(asTransposes('(1,2,3)')).toBe('(1,2)(2,3)')
  expect(asTransposes('(1,2,3)(4,5)')).toBe('(1,2)(2,3)(4,5)')

  expect(toCycleString(fromCycles('(1,2,3)'))).toBe('(1,2,3)')
  expect(toCycleString(fromCycles('(1,2)(2,3)'))).toBe('(1,2,3)')
})