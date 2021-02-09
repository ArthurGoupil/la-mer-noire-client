import Cookies from "js-cookie";
import ECookieName from "constants/Cookies.constants";

interface SetGameCookieProps {
  prefix: string;
  cookieName: ECookieName;
  cookieValue: string | object;
}

interface GetCookieProps {
  prefix: string;
  cookieName: ECookieName;
}

export const getCookie = <T>({ prefix, cookieName }: GetCookieProps): T => {
  return Cookies.getJSON(`${prefix}-${cookieName}`);
};

export const setCookie = ({
  prefix,
  cookieName,
  cookieValue,
}: SetGameCookieProps): void => {
  Cookies.set(`${prefix.toUpperCase()}-${cookieName}`, cookieValue);
};
