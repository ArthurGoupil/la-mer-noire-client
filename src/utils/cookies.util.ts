import Cookies from "js-cookie";
import { CookieName } from "constants/Cookies.constants";

interface SetGameCookieProps<T> {
  prefix: string;
  cookieName: CookieName;
  cookieValue: T;
}

interface GetCookieProps {
  prefix: string;
  cookieName: CookieName;
}

export const getCookie = <T>({ prefix, cookieName }: GetCookieProps): T => {
  return Cookies.getJSON(`${prefix}-${cookieName}`);
};

export const setCookie = <T>({ prefix, cookieName, cookieValue }: SetGameCookieProps<T>): void => {
  Cookies.set(
    `${prefix.toUpperCase()}-${cookieName}`,
    cookieValue as string | Record<string, unknown>,
    {
      expires: 1,
    },
  );
};

export const resetCookies = (): void => {
  for (const cookieName of Object.keys(Cookies.get())) {
    Cookies.remove(cookieName);
  }
};
