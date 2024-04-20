function areDisjointSets(sets: any[][]) {
  return sets.every(set =>
    set.every(e =>
      sets
        .filter(_set => _set !== set) // exclude self
        .every(_set => !_set.includes(e))
    ))
}

function isSetContainedInSets(set: any[], sets: any[][]) {
  return sets
    .filter(_set => _set !== set) // exclude self
    .some(_set => areSetsIdentical(set, _set))
}

/** check if set1 is a subset of set2 */
function isSubsetOf<T>(set1: T[], set2: T[]) {
  return set1.every(s1 => set2.includes(s1))
}

function uniqueSets<T>(sets: T[][]) {
  return sets.reduce<T[][]>((acc, set) => {
    if (isSetContainedInSets(set, acc)) {
      return acc;
    }

    acc.push(set)
    return acc;
  }, [])
}

function isSetFormedByPartitions(set: any[], partitions: any[][]) {
  const formedSet = partitions.flatMap(p => p)
  return areSetsIdentical(formedSet, set)
}

function areSetsIdentical(a: any[], b: any[]) {
  return a.length === b.length && a.every(e => b.includes(e))
}

/** range with length from start (default 0) */
function range(length: number, start = 0) {
  return [...Array(length)].map((_, idx) => idx + start)
}

export {
  areDisjointSets,
  isSetContainedInSets,
  isSubsetOf,
  uniqueSets,
  isSetFormedByPartitions,
  areSetsIdentical,
  range,
}