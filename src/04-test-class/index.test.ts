import {
  BankAccount,
  getBankAccount,
  /*TransferFailedError,*/
  /*SynchronizationFailedError,*/
  /*InsufficientFundsError,*/
} from './index';

type BankAccountType = BankAccount;

type BankTransferDetails = {
  account: BankAccountType;
  toAccount: BankAccountType;
  initialBalance: number;
  insufficientAmount: number;
  amount: number;
};

const initialBalance = 100000;

const transferDetails: BankTransferDetails = {
  account: new BankAccount(initialBalance),
  toAccount: new BankAccount(initialBalance),
  initialBalance,
  insufficientAmount: initialBalance + 0.001,
  amount: 100_000,
};

describe('BankAccount', (): void => {
  beforeEach(
    () =>
      (transferDetails.account = getBankAccount(
        transferDetails.initialBalance,
      )),
  );

  test('should create account with initial balance', (): void => {
    expect(getBankAccount(transferDetails.initialBalance)).toStrictEqual(
      transferDetails.account,
    );
    expect(transferDetails.account.getBalance()).toEqual(
      transferDetails.initialBalance,
    );
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
  });

  test('should deposit money', () => {
    // Write your test here
  });

  test('should withdraw money', () => {
    // Write your test here
  });

  test('should transfer money', () => {
    // Write your test here
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
