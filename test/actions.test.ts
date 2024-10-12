
import { CyclicGroupOf } from "../groups/varieties/cyclic";
import { DihedralGroupOfOrder } from "../groups/varieties/dihedral";
import { SymmetricGroupOf } from "../groups/varieties/symmetric";
import { Action, checkFirstProperty, checkSecondProperty } from "../groups/properties/action";
import { conjugacy } from "../groups/properties/conjugacy";
import { Group, Homomorphism } from "../definitions/group";
import { describe, expect, it } from 'vitest'

describe('Actions', () => {
  it('S3 acts on the set [1,2,3]', () => {
    const set = ['1', '2', '3'];
    const S3 = SymmetricGroupOf(3);
    const map: Homomorphism<[string, string], string> = ([g, a]) => {
      const idx = set.indexOf(a);
      return {
        '': ['1', '2', '3'],
        "(2,3)": ['1', '3', '2'],
        "(1,2)": ['2', '1', '3'],
        "(1,2,3)": ['2', '3', '1'],
        "(1,3,2)": ['3', '1', '2'],
        "(1,3)": ['3', '2', '1'],
      }[g]![idx]
    }

    const action: Action<string, string> = {
      group: S3,
      set,
      map,
    }

    expect(checkFirstProperty(action)).toBe(true)
    expect(checkSecondProperty(action)).toBe(true)
  })

  it('D4 acts on rectangle', () => {
    //   D┌────┐C
    //    │    │ 
    //    │    │ 
    //   A└────┘B 
    const set = ['A', 'B', 'C', 'D'];
    const D4 = DihedralGroupOfOrder(8);
    const map: Homomorphism<[string, string], string> = ([g, a]) => {
      const idx = set.indexOf(a);
      return {
        '': ['A', 'B', 'C', 'D'],
        'r': ['D', 'A', 'B', 'C'],
        'rr': ['C', 'D', 'A', 'B'],
        'rrr': ['B', 'C', 'D', 'A'],
        's': ['D', 'C', 'B', 'A'],
        'sr': ['A', 'D', 'C', 'B'],
        'srr': ['B', 'A', 'D', 'C'],
        'srrr': ['C', 'B', 'A', 'D'],
      }[g]![idx]
    }

    const action: Action<string, string> = {
      group: D4,
      set,
      map,
    }

    expect(checkFirstProperty(action)).toBe(true)
    expect(checkSecondProperty(action)).toBe(true)
  })

  it.each([
    { name: 'S3', group: SymmetricGroupOf(3) },
    { name: 'D4', group: DihedralGroupOfOrder(8) },
    { name: 'C6', group: CyclicGroupOf(6) },
  ])('G acts on itself by conjugation $name', ({ group }) => {
    // (g,x) = g.x.g'
    const G: Group<any> = group;
    const X = G.set;
    const conjugate = conjugacy(G)
    const map: Homomorphism<[any, any], any> = ([g, x]) => conjugate(g, x)
    const action: Action<any, any> = {
      group: G,
      set: X,
      map,
    }

    expect(checkFirstProperty(action)).toBe(true)
    expect(checkSecondProperty(action)).toBe(true)
  })

})
