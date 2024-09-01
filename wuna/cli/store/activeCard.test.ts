import { describe, expect, test } from '@jest/globals';
import { mergeTwoArrays } from './activeCards';

describe('merge two array tests', () => {

  test('at beginning', () => {
    let input = [1, 2, 3];
    mergeTwoArrays(input, [1])
    expect(input).toBe([1, 1, 2, 3]);
  });

  test('at end', () => {
    let input = [1, 2, 3];
    mergeTwoArrays(input, [3])
    expect(input).toBe([1, 2, 3, 3]);
  });

  test('at middle', () => {
    let input = [1, 2, 3];
    mergeTwoArrays(input, [2])
    expect(input).toBe([1, 2, 2, 3]);
  });
});
