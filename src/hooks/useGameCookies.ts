import Cookies from "js-cookie";

import { ECookieName } from "constants/Cookies.constants";

interface UseGameCookieProps {
  prefix: string;
  cookieName: ECookieName;
}

const useGameCookie = <T>({ prefix, cookieName }: UseGameCookieProps): T => {
  return Cookies.getJSON(`${prefix}-${cookieName}`);
};

export default useGameCookie;
