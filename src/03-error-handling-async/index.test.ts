// Uncomment the code below and write your tests
// import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';
import {
  throwError,
  resolveValue,
  throwCustomError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue(3)).toBe(3);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('Error Message')).toThrowError('Error Message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(
      'This is my awesome custom error!',
    );
  });
});
