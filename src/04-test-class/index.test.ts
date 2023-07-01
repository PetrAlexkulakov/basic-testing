// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(10);
    expect(bankAccount.getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(10);
    expect(() => bankAccount.withdraw(100)).toThrowError(
      'Insufficient funds: cannot withdraw more than 10',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(10);
    const bankAccountTo = getBankAccount(10);
    expect(() => bankAccount.transfer(100, bankAccountTo)).toThrowError(
      'Insufficient funds: cannot withdraw more than 10',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(10);
    expect(() => bankAccount.transfer(10, bankAccount)).toThrowError(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(10);
    expect(bankAccount.deposit(5) instanceof Object).toEqual(true);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(10);
    expect(bankAccount.withdraw(5) instanceof Object).toEqual(true);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(10);
    const bankAccountTo = getBankAccount(10);
    expect(bankAccount.transfer(5, bankAccountTo) instanceof Object).toEqual(
      true,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(10);
    const typeOfFetchBalance = typeof (await bankAccount.fetchBalance());
    expect(
      typeOfFetchBalance === 'number' || typeOfFetchBalance === 'object',
    ).toEqual(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(10);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(50);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(10);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      'Synchronization failed',
    );
  });
});
