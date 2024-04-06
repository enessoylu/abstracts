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

export {
  areDisjointSets,
  isSetContainedInSets,
  uniqueSets,
  isSetFormedByPartitions,
  areSetsIdentical,
}