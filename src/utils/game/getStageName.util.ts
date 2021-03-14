import { GameStage } from "constants/GameStage.constants";

interface GetStageNameProps {
  gameStage: GameStage;
}

export const getStageName = ({ gameStage }: GetStageNameProps): string => {
  switch (gameStage) {
    case GameStage.caPasseOuCaCash:
      return "ÇA PASSE OU ÇA CASH !";
    default:
      return "Unknown game stage.";
  }
};
