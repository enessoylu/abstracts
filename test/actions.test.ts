import { CyclicGroupOf } from "../groups";
import { Action, checkFirstProperty, checkSecondProperty } from "../groups/action";
import { DihedralGroupOfOrder } from "../groups/dihedral";
import { SymmetricGroupOf } from "../groups/symmetric";
import { Group, Homomorphism } from "../types";

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

  it.each([
    { name: 'S3', group: SymmetricGroupOf(3) },
    { name: 'D4', group: DihedralGroupOfOrder(8) },
    { name: 'C6', group: CyclicGroupOf(6) },
  ])('G acts on itself by conjugation $name', ({ group }) => {
    // (g,x) = g.x.g'
    const G: Group<any> = group;
    const X = G.set;
    const map: Homomorphism<[any, any], any> = ([g, x]) => {
      const gx = G.mul(g, x);
      const gPrime = G.inverse(g);
      return G.mul(gx, gPrime)
    }
    const action: Action<any, any> = {
      group: G,
      set: X,
      map,
    }

    expect(checkFirstProperty(action)).toBe(true)
    expect(checkSecondProperty(action)).toBe(true)
  })

})
