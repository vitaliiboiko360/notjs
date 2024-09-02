import { describe, expect, test } from '@jest/globals';
import { compare } from './Game';
import { WILD, RED, GREEN } from './Cards';

describe('compare function', () => {

  test('same color wild order', () => {
    let input = [WILD.Wild, WILD.Draw4];
    expect(compare(input[0], input[1])).toBe(-1);
  });

  test('same color wild order', () => {
    let input = [WILD.Draw4, WILD.Wild];
    expect(compare(input[0], input[1])).toBe(1);
  });

  test('same card', () => {
    let input = [WILD.Wild, WILD.Wild];
    expect(compare(input[0], input[1])).toBe(0);
  });

  test('mixed colors', () => {
    let input = [WILD.Wild, RED._0, GREEN._0];
    expect(input.sort(compare)).toBe(input);
  });
});