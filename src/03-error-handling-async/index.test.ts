import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', (): void => {
  test('should resolve provided value', async (): Promise<void> => {
    const value = 'Some resolved value';
    await expect(resolveValue(value)).resolves.toBe(value);
  });
});

describe('throwError', (): void => {
  test('should throw error with provided message', (): void => {
    const msg = 'Message: Operation failed';
    expect(() => throwError(msg)).toThrowError(new Error(msg));
  });

  test('should throw error with default message if message is not provided', (): void => {
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrowError(new Error(defaultMessage));
  });
});

describe('throwCustomError', (): void => {
  test('should throw custom error', (): void => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', (): void => {
  test('should reject custom error', async (): Promise<void> => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
