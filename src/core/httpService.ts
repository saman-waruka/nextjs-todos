import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
export type RxiosConfig = AxiosRequestConfig;

type BasicObject = Record<string, unknown> | object;

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export class HttpService {
  private httpClient: AxiosInstance;
  protected authHeader = "Authorization";

  constructor(options: RxiosConfig = {}) {
    this.httpClient = axios.create(options);
  }

  interceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config;
  };

  private async makeRequest<T>(config: RxiosConfig) {
    return this.httpClient.request<T>(this.interceptor(config));
  }

  public get<T>(
    url: string,
    params?: BasicObject,
    config?: AxiosRequestConfig
  ) {
    const request = {
      method: HttpMethod.GET,
      url,
      params,
      ...config,
    };
    return this.makeRequest<T>(request);
  }

  public post<T>(
    url: string,
    payload: BasicObject,
    config: AxiosRequestConfig = {}
  ) {
    const request = {
      method: HttpMethod.POST,
      url,
      data: payload,
      ...config,
    };
    return this.makeRequest<T>(request);
  }

  public put<T>(
    url: string,
    payload: BasicObject,
    config: AxiosRequestConfig = {}
  ) {
    const request = {
      method: HttpMethod.PUT,
      url,
      data: payload,
      ...config,
    };
    return this.makeRequest<T>(request);
  }

  public patch<T>(
    url: string,
    payload: BasicObject,
    config: AxiosRequestConfig = {}
  ) {
    const request = {
      method: HttpMethod.PATCH,
      url,
      data: payload,
      ...config,
    };
    return this.makeRequest<T>(request);
  }

  public delete<T>(
    url: string,
    params?: BasicObject,
    config: AxiosRequestConfig = {}
  ) {
    const request = {
      method: HttpMethod.DELETE,
      url,
      params,
      ...config,
    };
    return this.makeRequest<T>(request);
  }
}

export default HttpService;
