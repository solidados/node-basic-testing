import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = { a: 100, b: 5, action: Action.Add };
    const expected = 105;
    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should subtract two numbers', () => {
    const rawInput = { a: 100, b: 5, action: Action.Subtract };
    const expected = 95;
    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should multiply two numbers', () => {
    const rawInput = { a: 100, b: 5, action: Action.Multiply };
    const expected = 500;
    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should divide two numbers', () => {
    const rawInput = { a: 100, b: 5, action: Action.Divide };
    const expected = 20;
    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = { a: 100, b: 5, action: Action.Exponentiate };
    const expected = 10_000_000_000;
    expect(simpleCalculator(rawInput)).toBe(expected);
  });

  test('should return null for invalid action', () => {
    const rawInput = { a: 'Yes, I will', b: true, action: 'unknown' };
    expect(simpleCalculator(rawInput)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const rawInput = { a: 'one hundred', b: 5, action: Action.Divide };
    expect(simpleCalculator(rawInput)).toBeNull();
  });
});
