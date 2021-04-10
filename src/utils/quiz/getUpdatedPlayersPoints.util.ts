import { AnswerType } from "constants/AnswerType.constants";
import { QuizStage } from "constants/GameStage.constants";
import { Answer, Buzz, PlayersPoints } from "models/Game.model";
import { QuizLevel } from "models/Quiz.model";

interface GetUpdatedPlayersPointsProps {
  stage: QuizStage;
  formerPlayersPoints: PlayersPoints;
  quizLevel: QuizLevel;
  playersAnswers: Record<string, Answer>;
  playersBuzz?: Record<string, Buzz>;
  pointsRecord: {
    beginner: { duo: number; carre: number; cash: number };
    intermediate: { duo: number; carre: number; cash: number };
    expert: { duo: number; carre: number; cash: number };
  };
  currentPlayers: string[];
}

export const getUpdatedPlayersPoints = ({
  stage,
  formerPlayersPoints,
  quizLevel,
  playersAnswers,
  playersBuzz,
  pointsRecord,
  currentPlayers,
}: GetUpdatedPlayersPointsProps): PlayersPoints => {
  const updatedPlayersPoints: PlayersPoints = { ...formerPlayersPoints };

  switch (stage) {
    case QuizStage.caPasseOuCaCash:
      for (const playerId of Object.keys(formerPlayersPoints)) {
        updatedPlayersPoints[playerId].previous = formerPlayersPoints[playerId].current;
        const additionalPoints = playersAnswers[playerId]?.isGoodAnswer
          ? pointsRecord[quizLevel][playersAnswers[playerId].answerType] +
            (playersAnswers[playerId].isFirstGoodCash ? 1 : 0)
          : 0;

        updatedPlayersPoints[playerId].current += additionalPoints;
      }
      break;
    case QuizStage.kidimieux:
      for (const playerId of Object.keys(formerPlayersPoints)) {
        updatedPlayersPoints[playerId].previous = formerPlayersPoints[playerId].current;
        if (currentPlayers?.includes(playerId) && playersBuzz) {
          const deltaPoints =
            playersAnswers[playerId] && playersAnswers[playerId]?.isGoodAnswer
              ? pointsRecord[quizLevel][playersAnswers[playerId].answerType]
              : -pointsRecord[quizLevel][playersBuzz[playerId].answer as AnswerType];
          updatedPlayersPoints[playerId].current += deltaPoints;
        }
      }
      break;
  }

  return updatedPlayersPoints;
};
