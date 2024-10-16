import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 123, b: 456, action: Action.Add, expected: 579 },
  { a: 456, b: 123, action: Action.Subtract, expected: 333 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 10, b: 0, action: Action.Divide, expected: Infinity },
  { a: -10, b: 0, action: Action.Divide, expected: -Infinity },
  { a: 0, b: 0, action: Action.Divide, expected: NaN },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: 'unknown', expected: null },
  { a: 'Yes, I will', b: true, action: Action.Add, expected: null },
];

describe('simpleCalculator', (): void => {
  test.each(testCases)(
    'should return $expected, when $a $action $b',
    ({ a, b, action, expected }): void => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
