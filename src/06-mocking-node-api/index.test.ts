import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';

import path from 'node:path';
import fs from 'node:fs';

const callback = (): null => null;
let interval: number;
const timeout = (interval = 1000);

describe('doStuffByTimeout', (): void => {
  let spyTimeout: jest.SpyInstance;

  beforeAll(() => jest.useFakeTimers());
  beforeEach(() => (spyTimeout = jest.spyOn(global, 'setTimeout')));
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.useRealTimers());

  test('should set timeout with provided callback and timeout', (): void => {
    doStuffByTimeout(callback, timeout);
    expect(spyTimeout).toBeCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', (): void => {
    const mockCallback: jest.Mock = jest.fn(callback);

    doStuffByTimeout(mockCallback, timeout);
    expect(mockCallback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);
    expect(mockCallback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', (): void => {
  let spyInterval: jest.SpyInstance;

  beforeAll(() => jest.useFakeTimers());
  beforeEach(() => (spyInterval = jest.spyOn(global, 'setInterval')));
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.useRealTimers());

  test('should set interval with provided callback and timeout', (): void => {
    doStuffByInterval(callback, interval);
    expect(spyInterval).toBeCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', (): void => {
    const mockCallback: jest.Mock = jest.fn(callback);

    doStuffByInterval(mockCallback, timeout);
    expect(mockCallback).not.toBeCalled();

    Array.from({ length: 5 }).forEach((_, i: number): void => {
      jest.advanceTimersByTime(interval);
      expect(mockCallback).toBeCalledTimes(i + 1);
    });
  });
});

describe('readFileAsynchronously', (): void => {
  const mockPathToFile: string | null = 'mockFile.txt';
  const mockFileContent = `console.log('Hello, Jest!')`;

  let spyOnJoin: jest.SpyInstance;
  let spyOnExistSync: jest.SpyInstance;
  let spyOnReadFile;

  beforeEach((): void => {
    spyOnJoin = jest.spyOn(path, 'join');

    spyOnExistSync = jest.spyOn(fs, 'existsSync');
    spyOnExistSync.mockReturnValue(false);

    spyOnReadFile = jest.spyOn(fs.promises, 'readFile');
    spyOnReadFile.mockResolvedValue(Buffer.from(mockFileContent));
  });
  afterEach(() => jest.clearAllMocks());

  test('should call join with pathToFile', async (): Promise<void> => {
    await readFileAsynchronously(mockPathToFile);
    expect(spyOnJoin).toBeCalled();
  });

  test('should return null if file does not exist', async (): Promise<void> => {
    await expect(readFileAsynchronously(mockPathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    spyOnExistSync.mockReturnValueOnce(true);
    await expect(readFileAsynchronously(mockPathToFile)).resolves.toBe(
      mockFileContent,
    );
  });
});
