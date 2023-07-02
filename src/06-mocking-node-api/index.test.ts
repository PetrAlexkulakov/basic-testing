// Uncomment the code below and write your tests
import path from 'path';
import fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(() => null, 1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const defFunc = jest.fn();
    doStuffByTimeout(defFunc, 1000);

    jest.advanceTimersByTime(1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(defFunc).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(() => null, 1000);

    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');

    const defFunc = jest.fn();
    doStuffByInterval(defFunc, 1000);

    jest.advanceTimersByTime(3000);
    expect(defFunc).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously('./index.ts');
    expect(spyJoin).toHaveBeenCalledWith(__dirname, './index.ts');
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('./not-exist.js');
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const promise: Promise<string | Buffer> = new Promise((resolve) =>
      resolve(Buffer.from('something', 'utf-8')),
    );
    jest.spyOn(fsPromises, 'readFile').mockReturnValue(promise);
    const result = await readFileAsynchronously('./index.ts');
    expect(result).toEqual('something');
  });
});
