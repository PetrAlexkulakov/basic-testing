import { simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 10, action: '+' })).toBe(13);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 3, action: '-' })).toBe(7);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 5, action: '*' })).toBe(20);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: '/' })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: '^' })).toBe(8);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: '%' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '2', b: 3, action: '+' })).toBeNull();
  });
});
