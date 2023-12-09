import axios from 'axios';
export default class GenericApiService {
  public static baseUrl: string = process.env.REACT_APP_HOST || '/';

  public static async getAll<T>(url: string): Promise<T> {
    return await axios
      .create()
      .get<Array<T>>(this.baseUrl + url, { withCredentials: true })
      .then(async (result: any) => {
        return result.data;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  public static async get<T>(url: string): Promise<T> {
    return await axios
      .create()
      .get<T>(`${this.baseUrl}${url}`, {
        withCredentials: true,
      })
      .then(async (result: any) => {
        let data = result.data;
        return data;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  public static async post<T>(url: string, data: T): Promise<T> {
    return await axios
      .create()
      .post<T>(`${this.baseUrl}${url}`, data, { withCredentials: true })
      .then(async (result: any) => {
        let data = result.data;
        return data;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  public static async postWithDifferentResponse<T, V>(
    url: string,
    data: T
  ): Promise<V> {
    return await axios
      .create()
      .post<T>(`${this.baseUrl}${url}`, data, { withCredentials: true })
      .then(async (result: any) => {
        let data = result.data;
        return data;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  public static async put<T>(url: string, id: number, data: T): Promise<T> {
    return await axios
      .create()
      .put<T>(`${this.baseUrl}${url}/${id}`, data, {
        withCredentials: true,
      })
      .then(async (result: any) => {
        let data = result.data;
        return data;
      })
      .catch((err: any) => {
        throw err;
      });
  }

  public static async delete<T>(url: string): Promise<T> {
    return await axios
      .create()
      .delete(`${this.baseUrl}${url}`, { withCredentials: true })
      .then(async (result: any) => {
        let data = result.data;
        return data;
      })
      .catch((err: any) => {
        throw err;
      });
  }
}
