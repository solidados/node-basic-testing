import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', (): void => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const endPoint = '/todos/1';

  beforeAll(() => jest.useFakeTimers());
  beforeEach(() => jest.runOnlyPendingTimers());
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.useRealTimers());

  test('should create instance with provided base url', async (): Promise<void> => {
    const spyOnCreateInstance: jest.SpyInstance<AxiosInstance> = jest.spyOn(
      axios,
      'create',
    );

    await throttledGetDataFromApi(endPoint);

    expect(spyOnCreateInstance).lastCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async (): Promise<void> => {
    const spyOnGet: jest.SpyInstance = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi(endPoint);

    expect(spyOnGet).lastCalledWith(endPoint);
  });

  test('should return response data', async (): Promise<void> => {
    type TodoType = {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    };

    const expectedResponseData: TodoType = {
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      completed: expect.any(Boolean),
    };

    const responseData = await throttledGetDataFromApi(endPoint);

    expect(responseData).toEqual(expect.objectContaining(expectedResponseData));
  });
});
