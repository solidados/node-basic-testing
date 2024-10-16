import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

type BankTransferDetails = {
  account: BankAccount;
  toAccount: BankAccount;
  initialBalance: number;
  insufficientAmount: number;
  amount: number;
};

const initialBalance = 100_000;

describe('BankAccount', (): void => {
  let transferDetails: BankTransferDetails;

  beforeEach((): void => {
    transferDetails = {
      account: getBankAccount(initialBalance),
      toAccount: getBankAccount(initialBalance),
      initialBalance,
      insufficientAmount: initialBalance + 0.001,
      amount: 5_000,
    };
  });

  test('should create account with initial balance', (): void => {
    const { account } = transferDetails;
    const newAccount = getBankAccount(initialBalance);

    expect(newAccount).toStrictEqual(account);
    expect(account.getBalance()).toStrictEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', (): void => {
    const { account, insufficientAmount } = transferDetails;

    expect(() => account.withdraw(insufficientAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', (): void => {
    const { account, toAccount, insufficientAmount } = transferDetails;

    expect(() => account.transfer(insufficientAmount, toAccount)).toThrowError(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring to the same account', (): void => {
    const { account, initialBalance } = transferDetails;

    expect(() => account.transfer(initialBalance, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', (): void => {
    const { account, amount } = transferDetails;
    const expectedBalance: number = initialBalance + amount;

    account.deposit(amount);
    expect(account.getBalance()).toStrictEqual(expectedBalance);
  });

  test('should withdraw money', (): void => {
    const { account, amount } = transferDetails;

    account.withdraw(amount);
    expect(account.getBalance()).toBeGreaterThanOrEqual(0);
  });

  test('should transfer money', (): void => {
    const { account, toAccount, amount } = transferDetails;
    const prevToAccountBalance: number = toAccount.getBalance();

    account.transfer(amount, toAccount);
    expect(account.getBalance()).toBeLessThan(initialBalance);
    expect(toAccount.getBalance()).toStrictEqual(prevToAccountBalance + amount);
  });

  test('fetchBalance should return number in case if request did not fail', async (): Promise<void> => {
    const { account } = transferDetails;
    const fetchBalanceMock = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(1_000);

    const fetchedBalance: number | null = await account.fetchBalance();

    expect(fetchedBalance).not.toBeNull();
    expect(typeof fetchedBalance).toBe('number');
    expect(fetchedBalance).toBe(1_000);

    fetchBalanceMock.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async (): Promise<void> => {
    const { account } = transferDetails;
    const mockBalance = 50_000;

    const fetchBalanceMock = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(mockBalance);

    await account.synchronizeBalance();
    expect(account.getBalance()).toStrictEqual(mockBalance);
    fetchBalanceMock.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async (): Promise<void> => {
    const { account } = transferDetails;
    const fetchBalanceMock = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
    fetchBalanceMock.mockRestore();
  });
});
