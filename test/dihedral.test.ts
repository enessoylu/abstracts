import { expect, test } from 'vitest';
import { dihedralInverseOfOrder, dihedralMulOfOrder, dihedralSetOfOrder } from '../groups/dihedral'

test('dihedral multiplication', () => {
  const mul = dihedralMulOfOrder(8);
  expect(mul('rrr', 'r')).toBe('')
  expect(mul('rrr', 'rr')).toBe('r')
  expect(mul('rsr', 'rrr')).toBe('srrr')
  expect(mul('rs', 'rs')).toBe('')
  expect(mul('rsrs', 'r')).toBe('r')
  expect(mul('rs', '')).toBe('srrr')
  expect(mul('sr', 's')).toBe('rrr')
})

test('dihedral set', () => {
  const set = dihedralSetOfOrder(8)
  expect(set).toMatchObject(['', 'r', 'rr', 'rrr', 's', 'sr', 'srr', 'srrr'])
})

test('dihedral inverse', () => {
  const inverse = dihedralInverseOfOrder(8)
  expect(inverse('r')).toBe('rrr')
  expect(inverse('')).toBe('')
  expect(inverse('s')).toBe('s')
  expect(inverse('sr')).toBe('sr')
  expect(inverse('rs')).toBe('srrr')
})