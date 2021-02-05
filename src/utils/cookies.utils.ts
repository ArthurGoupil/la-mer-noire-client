import Cookies from "js-cookie";
import ECookieName from "constants/Cookies.constants";

interface SetGameCookieProps {
  prefix: string;
  cookieName: ECookieName;
  cookieValue: string | object;
}

export const setCookie = ({
  prefix,
  cookieName,
  cookieValue,
}: SetGameCookieProps): void => {
  Cookies.set(`${prefix.toUpperCase()}-${cookieName}`, cookieValue);
};
