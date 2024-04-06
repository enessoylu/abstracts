import { describe, test, expect } from "vitest"
import { areDisjointSets, isSetContainedInSets, uniqueSets, isSetFormedByPartitions, areSetsIdentical } from "../groups/utils"

describe('test utilities', () => {
  test('areDisjointSets', () => {
    expect(areDisjointSets([[1, 2]])).toBe(true)
    expect(areDisjointSets([[1, 2], [3, 4]])).toBe(true)
    expect(areDisjointSets([[1, 2], [1]])).toBe(false)
  })

  test('isSetContainedInSets', () => {
    expect(isSetContainedInSets([1, 2], [[1, 2]])).toBe(true)
    expect(isSetContainedInSets([1, 2, 3], [[1, 2]])).toBe(false)
    expect(isSetContainedInSets([1, 2], [[1, 2, 3]])).toBe(false)

    const set = [1, 2]
    const sets = [set, [3, 4]]
    expect(isSetContainedInSets(set, sets)).toBe(false)
  })

  test('uniqueSets', () => {
    expect(uniqueSets([[1, 2], [3, 4]])).toMatchObject([[1, 2], [3, 4]])
    expect(uniqueSets([[1, 2], [3, 4], [2, 1]])).toMatchObject([[1, 2], [3, 4]])
  })

  test('isSetFormedByPartitions', () => {
    expect(isSetFormedByPartitions([1, 2], [[1], [2]])).toBe(true)
  })

  test('areSetsIdentical', () => {
    expect(areSetsIdentical([1, 2], [2, 1])).toBe(true)
    expect(areSetsIdentical([1, 2, 3], [2, 1])).toBe(false)
  })
})
