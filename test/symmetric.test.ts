import { SymmetricGroupOf } from "../groups/symmetric"

test('Symmetric', () => {
  const S3 = SymmetricGroupOf(3);

  expect(S3.set).toMatchObject([
    '',
    "(2,3)",
    "(1,2)",
    "(1,2,3)",
    "(1,3,2)",
    "(1,3)"
  ])
  expect(S3.e).toBe('')
  
  expect(S3.mul('', '(1,2)')).toBe('(1,2)')
  expect(S3.mul('(2,3)', '(1,2)')).toBe('(1,3,2)')
  expect(S3.mul('(1,2)', '(2,3)')).toBe('(1,2,3)')
  expect(S3.mul('(2,3)', '(2,3)')).toBe('')

  expect(S3.inverse('')).toBe('')
  expect(S3.inverse('(1,2)')).toBe('(1,2)')
  expect(S3.inverse('(1,2,3)')).toBe('(1,3,2)')
  expect(S3.inverse('(1,3,2)')).toBe('(1,2,3)')
})