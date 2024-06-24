import { AxiosResponse } from "axios";
import { BaseService } from "../base/baseService";
import { ILoginResponse } from "./authService.interface";

export class AuthService extends BaseService {
  constructor() {
    super();
  }

  async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<ILoginResponse>> {
    return this.http.post<ILoginResponse>("auth/login", { username, password });
  }
}
