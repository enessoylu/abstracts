import { Action, checkFirstProperty, checkSecondProperty } from "../groups/action";
import { DihedralGroupOfOrder } from "../groups/dihedral";
import { Homomorphism } from "../types";

describe('Actions', () => {
  it('D4 action on rectangle', () => {
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
