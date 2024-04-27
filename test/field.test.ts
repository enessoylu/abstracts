import { expect, test } from "vitest";
import { finiteFieldArithmetic, gcd } from "../groups/feild";

test('gcd', () => {
  expect(gcd(23, 1)).toBe(1)
  expect(gcd(18, 6)).toBe(6)
  expect(gcd(18, 12)).toBe(6)
})

test('multiplicative inverse', () => {
  const { mul_inv, mul } = finiteFieldArithmetic(463)

  expect(mul(mul_inv(143)!, 143)).toBe(1)
  expect(mul(mul_inv(34)!, 34)).toBe(1)
  expect(mul(mul_inv(19)!, 19)).toBe(1)
  expect(mul(mul_inv(460)!, 460)).toBe(1)
  expect(mul(mul_inv(42)!, 42)).toBe(1)
  expect(mul(mul_inv(1)!, 1)).toBe(1)
  expect(mul(mul_inv(3)!, 3)).toBe(1)
})
