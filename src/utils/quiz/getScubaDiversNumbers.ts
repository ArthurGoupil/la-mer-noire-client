import { CookieName } from "constants/Cookies.constants";
import { PlayerData } from "models/Game.model";
import { getCookie, setCookie } from "utils/cookies.util";

interface GetScubaDiversNumbersProps {
  shortId: string;
  players: PlayerData[];
}

interface GetScubaDiversNumbersReturn {
  scubaDiversNumbers: Record<string, number>;
}

export const getScubaDiversNumbers = ({
  shortId,
  players,
}: GetScubaDiversNumbersProps): GetScubaDiversNumbersReturn => {
  const existingScubaDiversNumbers = getCookie<Record<string, number>>({
    prefix: shortId,
    cookieName: CookieName.scubaDiversNumbers,
  });

  if (existingScubaDiversNumbers) {
    return { scubaDiversNumbers: existingScubaDiversNumbers };
  }

  const availableDiversNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const scubaDiversNumbers: Record<string, number> = {};

  players.forEach((playerData) => {
    const scubaDiverNumber = Math.floor(Math.random() * 10) + 1;
    availableDiversNumber.splice(scubaDiverNumber + 1, 1);

    scubaDiversNumbers[playerData.player._id] = scubaDiverNumber;
  });

  setCookie({
    prefix: shortId,
    cookieName: CookieName.scubaDiversNumbers,
    cookieValue: scubaDiversNumbers,
  });

  return { scubaDiversNumbers };
};
