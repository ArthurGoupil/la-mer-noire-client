import { Answer, PlayersPoints } from "models/Game.model";
import { QuizLevel } from "models/Quiz.model";

interface GetUpdatedPlayersPointsProps {
  formerPlayersPoints: PlayersPoints;
  quizLevel: QuizLevel;
  playersAnswers: Record<string, Answer>;
  pointsRecord: {
    beginner: { duo: number; carre: number; cash: number };
    intermediate: { duo: number; carre: number; cash: number };
    expert: { duo: number; carre: number; cash: number };
  };
}

export const getUpdatedPlayersPoints = ({
  formerPlayersPoints,
  quizLevel,
  playersAnswers,
  pointsRecord,
}: GetUpdatedPlayersPointsProps): PlayersPoints => {
  const updatedPlayersPoints: PlayersPoints = formerPlayersPoints;
  for (const playerId of Object.keys(formerPlayersPoints)) {
    updatedPlayersPoints[playerId].previous = formerPlayersPoints[playerId].current;
    const additionalPoints = playersAnswers[playerId]?.isGoodAnswer
      ? pointsRecord[quizLevel][playersAnswers[playerId].answerType] +
        (playersAnswers[playerId].isFirstGoodCash ? 1 : 0)
      : 0;

    updatedPlayersPoints[playerId].current += additionalPoints;
  }

  return updatedPlayersPoints;
};
