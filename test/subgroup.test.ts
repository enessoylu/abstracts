import { test } from "vitest";
import { fromCycles, inverseOfPermutation, multiply, printTable, toCycleString } from "../groups"
import { SymmetricGroupOf } from "../groups/symmetric";
import { Group } from "../types";

test('Subgroups', () => {
  const S3 = SymmetricGroupOf(3);

  printTable(S3)

  const sub_items = [
    '(1,2,3)',
    '(1,3,2)',
    '',
  ]
  const sub_mul = (a: string, b: string) => toCycleString(multiply(fromCycles(a), fromCycles(b)))

  const sub_inverse = inverseOfPermutation
  const sub_e = '';
  const subS3: Group<string> = {
    e: sub_e,
    inverse: sub_inverse,
    mul: sub_mul,
    set: sub_items
  }

  printTable(subS3)
})
