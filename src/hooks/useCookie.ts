import Cookies from "js-cookie";

import ECookieName from "constants/Cookies.constants";

interface UseCookieProps {
  prefix: string;
  cookieName: ECookieName;
}

const useCookie = <T>({ prefix, cookieName }: UseCookieProps): T => {
  return Cookies.getJSON(`${prefix}-${cookieName}`);
};

export default useCookie;
