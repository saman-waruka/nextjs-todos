import HttpService from "@/core/httpService";
// import environment from "../../../environment";

export class BaseService {
  protected http: HttpService;

  constructor(token?: string) {
    this.http = new HttpService(
      {
        // baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        baseURL: `/proxy-api`,
      },
      token
    );
  }
}
