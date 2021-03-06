import { GameStage } from "constants/GameStage.constants";

interface GetStageNameProps {
  stage: GameStage;
}

export const getStageName = ({ stage }: GetStageNameProps): string => {
  switch (stage) {
    case GameStage.caPasseOuCaCash:
      return "ÇA PASSE OU ÇA CASH !";
    case GameStage.kidimieux:
      return "LE KIDIMIEUX";
    default:
      return "Unknown game stage.";
  }
};
