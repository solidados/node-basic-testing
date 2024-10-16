import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  const createMock = () => jest.fn();

  return {
    ...originalModule,
    mockOne: createMock(),
    mockTwo: createMock(),
    mockThree: createMock(),
  };
});

describe('partial mocking', (): void => {
  afterAll((): void => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', (): void => {
    jest.spyOn(console, 'log').mockImplementation((): null => null);

    mockOne();
    mockTwo();
    mockThree();
    expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', (): void => {
    jest.spyOn(console, 'log').mockImplementation((): null => null);
    unmockedFunction();
    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});
