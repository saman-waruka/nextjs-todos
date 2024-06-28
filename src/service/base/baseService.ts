import { PROXY_PATH } from "@/constants/keyValue";
import HttpService from "@/core/httpService";
// import environment from "../../../environment";

export class BaseService {
  protected http: HttpService;

  constructor(token?: string) {
    let baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT; // for server side api call
    if (global.window) {
      // service run on client side
      baseUrl = PROXY_PATH.BASE_URL;
    }
    this.http = new HttpService(
      {
        baseURL: baseUrl,
      },
      token
    );
  }
}
