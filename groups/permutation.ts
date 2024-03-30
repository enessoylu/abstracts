import { range } from "../utils";

const CycleListMatchRegexp = /\(([\d|\,]*)\)/g;

const permute = (length: number) => {
  return permuteRec(range(length, 1))
}
const permuteRec = <T>(list: T[], acc: T[][] = [], left: T[] = []): T[][] => {
  if (list.length === 1) {
    acc.push([...left, list[0]])
    return acc;
  }

  list.forEach(e => {
    const l = list.filter(ee => ee !== e);
    const left2 = [...left, e]
    permuteRec(l, acc, left2)
  })

  return acc;
}

const multiply = (a: number[], b: number[]) => {
  range(Math.max(a.length, b.length), 1).forEach((num, idx) => {
    if (a[idx] === undefined) a.push(num)
    if (b[idx] === undefined) b.push(num)
  })

  return a.map((e) => {
    return b[e - 1]
  })
}

const fromCycles = (cyclesStr: string) => {
  if (cyclesStr === '') return [];

  const length = cyclesStr.match(/[\d]+/g)
    ?.reduce((max, numStr) => Math.max(max, parseInt(numStr)), -Infinity)
    ?? 0;

  const cycleLists = Array.from(cyclesStr.matchAll(CycleListMatchRegexp))
    .map(([_, listString]) => listString.split(',').map(nStr => parseInt(nStr)))

  if (cycleLists.length === 0) return []

  const endResult = identityPermObject(length)
  cycleLists.reverse().forEach(list => {
    const cycleAsObj = identityPermObject(length);
    for (let i = 0; i < list.length; i++) {
      const from = list[i];
      const to = list[(i + 1) % list.length];
      cycleAsObj[from] = to
    }
    Object.entries(endResult).forEach(([from, to]) => {
      endResult[from] = cycleAsObj[to]
    })
  })

  return Object.values(endResult)
}
type CycleAsObject = Record<number, number>

const identityPermObject = (length: number) => range(length, 1).reduce<CycleAsObject>((acc, num) => {
  acc[num] = num;
  return acc;
}, {})

const toCycleString = (value: number[]) => {
  if ([...new Set(value)].length !== value.length) return 'invalid-permutation-' + value
  const list = [...value].map((e, idx) => {
    const from = idx + 1;
    return from === e ? null : e;
  });
  const cycles: number[][] = [];
  for (let idx = 0; idx < list.length; idx++) {
    const e = list[idx];
    if (e === null) continue;

    const from = idx + 1;
    const cycle = [from, e];

    let to = list[e - 1]!;
    while (to !== from) {
      cycle.push(to);
      to = list[to - 1]!
    }

    cycles.push(cycle);
    cycle.forEach(e => {
      const idx = e - 1;
      list[idx] = null;
    })
  }

  return cycles.map(c => `(${c.join(',')})`).join('')
}

// (x₁ x₂ … xₙ)=(x₁ x₂)(x₂ x₃)⋯ (xₙ₋₁ xₙ)
const asTransposes = (a: string) => {
  const cycleLists = Array.from(a.matchAll(CycleListMatchRegexp))
    .map(([_, listString]) => listString.split(','))
  if (cycleLists.length === 0) return ''

  return [...new Set(cycleLists
    .flatMap(list => {
      const transposes = list.map((item, idx) => [item, list[(idx + 1) % list.length]])
      transposes.pop()
      return transposes
    })
    .map(transpose => '(' + transpose.sort().join(',') + ')'))]
    .join('')
}

const inverseOfPermutation = (a: string) => {
  const aAsTransposes = asTransposes(a);
  const transposesInReverseOrder = Array.from(aAsTransposes.matchAll(CycleListMatchRegexp))
    .map(([_, listString]) => listString.split(','))
    .map(transpose => '(' + transpose.join(',') + ')')
    .reverse()
    .join()

  // simplify
  return toCycleString(fromCycles(transposesInReverseOrder))
}

export {
  asTransposes,
  fromCycles,
  inverseOfPermutation,
  multiply,
  permute,
  toCycleString,
}
