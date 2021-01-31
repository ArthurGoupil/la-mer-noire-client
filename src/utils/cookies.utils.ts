import Cookies from "js-cookie";
import { ECookieName } from "constants/Cookies.constants";

interface SetGameCookieProps {
  prefix: string;
  cookieName: ECookieName;
  cookieValue: string | object;
}

export const setGameCookie = ({
  prefix,
  cookieName,
  cookieValue,
}: SetGameCookieProps): void => {
  Cookies.set(`${prefix.toUpperCase()}-${cookieName}`, cookieValue);
};

export const setGameCookies = (cookiesData: SetGameCookieProps[]): void => {
  for (let cookieData of cookiesData) {
    Cookies.set(
      `${cookieData.prefix.toUpperCase()}-${cookieData.cookieName}`,
      cookieData.cookieValue,
    );
  }
};
