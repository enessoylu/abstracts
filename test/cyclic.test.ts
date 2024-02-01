import { CyclicGroupOf } from "../groups"

test('CyclicGroupOf', () => {
  const C6 = CyclicGroupOf(6);

  expect(C6.e).toBe(0)
  expect(C6.set).toMatchObject([0, 1, 2, 3, 4, 5])
  expect(C6.mul(1, 1)).toBe(2)
  expect(C6.mul(1, 2)).toBe(3)
  expect(C6.mul(2, 3)).toBe(5)
  expect(C6.mul(2, 4)).toBe(0)
  expect(C6.inverse(4)).toBe(2)
  expect(C6.inverse(1)).toBe(5)
  expect(C6.inverse(2)).toBe(4)
})
