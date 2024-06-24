import HttpService from "@/core/httpService";
// import environment from "../../../environment";

export class BaseService {
  protected http: HttpService;

  constructor() {
    this.http = new HttpService({
      baseURL: "/api",
    });
  }
}
