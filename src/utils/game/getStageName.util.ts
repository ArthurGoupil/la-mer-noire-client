import { EGameStage } from "constants/GameStage.constants";

interface GetStageNameProps {
  gameStage: EGameStage;
}

export const getStageName = ({ gameStage }: GetStageNameProps): string => {
  switch (gameStage) {
    case EGameStage.caPasseOuCaCash:
      return "ÇA PASSE OU ÇA CASH !";
    default:
      return "Unknown game stage.";
  }
};
