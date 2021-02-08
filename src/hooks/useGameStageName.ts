import EGameStage from "constants/GameStage.constants";

interface UseGameStageNameProps {
  gameStage: EGameStage;
}

const useGameStageName = ({ gameStage }: UseGameStageNameProps): string => {
  switch (gameStage) {
    case EGameStage.caPasseOuCaCash:
      return "ÇA PASSE OU ÇA CASH !";
    default:
      return "Unknown game stage.";
  }
};

export default useGameStageName;
