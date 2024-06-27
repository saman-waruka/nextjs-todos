import { CREDENTIAL } from "@/constants/keyValue";

export class Token {
  static set(token: string) {
    if (global.window) {
      const cookie = new (require("react-cookie") as any).Cookies();
      cookie.set(CREDENTIAL.ACCESS_TOKEN, token, { path: "/" });
      return;
    }
    const cookies = require("next/headers").cookies;
    cookies().set(CREDENTIAL.ACCESS_TOKEN, token);
  }

  static get(): string {
    if (global.window) {
      const cookie = new (require("react-cookie") as any).Cookies();
      const accessToken = cookie.get(CREDENTIAL.ACCESS_TOKEN);
      console.log("accessToken onClient", accessToken);
      return accessToken;
    }

    const cookies = require("next/headers").cookies;
    const accessToken = cookies().get(CREDENTIAL.ACCESS_TOKEN)?.value || "";

    console.log("accessToken onServer", accessToken);
    return accessToken;
  }

  static clear() {
    if (global.window) {
      const cookie = new (require("react-cookie") as any).Cookies();
      cookie.remove(CREDENTIAL.ACCESS_TOKEN);
      return;
    }
    const cookies = require("next/headers").cookies;
    cookies().delete(CREDENTIAL.ACCESS_TOKEN);
  }
}
