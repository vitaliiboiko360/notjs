import { describe, expect, test } from '@jest/globals';
import { mergeTwoArrays } from './activeCards';

describe('merge two array tests', () => {
  test('at beginning', () => {
    expect(mergeTwoArrays([1, 2, 3], [1])).toBe([1, 1, 2, 3]);
  });

  test('at end', () => {
    expect(mergeTwoArrays([1, 2, 3], [3])).toBe([1, 2, 3, 3]);
  });

  test('at middle', () => {
    expect(mergeTwoArrays([1, 2, 3], [2])).toBe([1, 2, 2, 3]);
  });
});
