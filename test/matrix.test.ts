import { expect, test } from "vitest";
import { R, multiplier } from "../groups/representation";

test('matrix multiplication', () => {
  const multiply = multiplier(R)

  const a = [
    [1, 0, 0],
    [2, 2, 0],
    [3, 0, 3],
  ]
  const b = [
    [1, 0, 0],
    [0, 2, 0],
    [0, 0, 1],
  ]
  const c = [
    [1, 0, 0],
    [2, 4, 0],
    [3, 0, 3],
  ]
  expect(multiply(a, b)).toMatchObject(c)
})