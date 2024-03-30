import { Action, checkFirstProperty, checkSecondProperty } from "../groups/action";
import { DihedralGroupOfOrder } from "../groups/dihedral";
import { SymmetricGroupOf } from "../groups/symmetric";
import { Homomorphism } from "../types";

describe('Actions', () => {
  it('S3 acting on the set [1,2,3]', () => {
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

  it('D4 acting on rectangle', () => {
    //   B┌────┐C
    //    │    │ 
    //    │    │ 
    //   A└────┘D 
    const set = ['A', 'B', 'C', 'D'];
    const D4 = DihedralGroupOfOrder(8);
    const map: Homomorphism<[string, string], string> = ([g, a]) => {
      const idx = set.indexOf(a);
      return {
        '': ['A', 'B', 'C', 'D'],
        'r': ['B', 'C', 'D', 'A'],
        'rr': ['C', 'D', 'A', 'B'],
        'rrr': ['D', 'A', 'B', 'C'],
        's': ['B', 'A', 'D', 'C'],
        'sr': ['A', 'D', 'C', 'B'],
        'srr': ['D', 'C', 'B', 'A'],
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
})
