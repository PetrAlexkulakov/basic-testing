// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const testURL = '/posts/1';
const baseURL = 'https://jsonplaceholder.typicode.com';
const data = {
  name: 'Name',
  age: 20,
};

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: data }),
    });

    await throttledGetDataFromApi(testURL);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: baseURL });
  });

  test('should perform request to correct provided url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: data }),
    });

    await throttledGetDataFromApi(testURL);
    jest.runAllTimers();

    const ourAxios = axios.create();
    expect(ourAxios.get).toHaveBeenCalledWith(testURL);
  });

  test('should return response data', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: data }),
    });

    const ourData = await throttledGetDataFromApi(testURL);

    expect(ourData).toBe(data);
  });
});
