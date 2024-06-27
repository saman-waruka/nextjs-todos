import { Token } from "@/utils/token.utils";
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
  private token: string | undefined;

  constructor(options: RxiosConfig = {}, token?: string) {
    this.httpClient = axios.create(options);
    this.token = token || Token.get();
  }

  interceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config;
  };

  private async makeRequest<T>(config: RxiosConfig, isAuth?: boolean) {
    if (isAuth) {
      const token = this.token || Token.get();
      console.log(" makeRequest with token \n", token);
      console.log("config ", config);
      if (config.headers) {
        config.headers = {
          ...config.headers,
          [this.authHeader]: `Bearer ${token}`,
        };
      } else {
        config.headers = { [this.authHeader]: `Bearer ${token}` };
      }
    }
    config.withCredentials = config.withCredentials ?? false;
    return this.httpClient.request<T>(this.interceptor(config));
  }

  public get<T>(
    url: string,
    params?: BasicObject,
    config?: AxiosRequestConfig,
    isAuth?: boolean
  ) {
    const request = {
      method: HttpMethod.GET,
      url,
      params,
      ...config,
    };
    return this.makeRequest<T>(request, isAuth);
  }

  public post<T>(
    url: string,
    payload: BasicObject,
    config: AxiosRequestConfig = {},
    isAuth?: boolean
  ) {
    const request = {
      method: HttpMethod.POST,
      url,
      data: payload,
      ...config,
    };
    return this.makeRequest<T>(request, isAuth);
  }

  public put<T>(
    url: string,
    payload: BasicObject,
    config: AxiosRequestConfig = {},
    isAuth?: boolean
  ) {
    const request = {
      method: HttpMethod.PUT,
      url,
      data: payload,
      ...config,
    };
    return this.makeRequest<T>(request, isAuth);
  }

  public patch<T>(
    url: string,
    payload: BasicObject,
    config: AxiosRequestConfig = {},
    isAuth?: boolean
  ) {
    const request = {
      method: HttpMethod.PATCH,
      url,
      data: payload,
      ...config,
    };
    return this.makeRequest<T>(request, isAuth);
  }

  public delete<T>(
    url: string,
    params?: BasicObject,
    config: AxiosRequestConfig = {},
    isAuth?: boolean
  ) {
    const request = {
      method: HttpMethod.DELETE,
      url,
      params,
      ...config,
    };
    return this.makeRequest<T>(request, isAuth);
  }
}

export default HttpService;
