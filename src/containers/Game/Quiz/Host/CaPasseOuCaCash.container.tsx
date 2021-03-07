import React from "react";

import { CategoryTheme } from "components/Quiz/Host/CategoryTheme";
import { QuestionDisplay } from "components/Quiz/Host/QuestionDisplay";
import { Game, PlayerData } from "models/Game.model";
import { isValidAnswer } from "utils/quiz/isValidAnswer.util";
import { TimeBar } from "components/Quiz/Others/TimeBar";
import { PlayerAnswer } from "components/Quiz/Host/PlayerAnswer";
import { useQuizLifetime } from "hooks/quiz/useQuizLifetime.hook";
import { useMutation } from "@apollo/client";
import { GENERATE_NEW_CURRENT_QUIZ_ITEM, GET_GAME } from "services/games.service";
import { QuizItemData } from "models/Quiz.model";
import { usePlayersAnswers } from "hooks/quiz/usePlayersAnswers.hook";
import { EQuizDuration } from "constants/QuizDuration.constants";
import { useCaPasseOuCaCashState } from "hooks/game/useCaPasseOuCaCashState.hook";
import { QuizInfosScreen } from "components/Quiz/Host/QuizInfosScreen";
import { useNonNullQuizItemData } from "hooks/quiz/useNonNullQuizItemData.hook";
import { QuizLayout } from "components/Quiz/Host/QuizLayout";
import { getLevelGradient } from "utils/quiz/getLevelGradient.util";
import { QuestionSummary } from "components/Quiz/Host/QuestionSummary";
import { PlayersRanking } from "components/Quiz/Host/PlayersRanking";
import { ECaPasseOuCaCashStatesTopScreensStatesNames } from "constants/CaPasseOuCaCash.constants";

interface CaPasseOuCaCashContainerProps {
  game: Game;
  quizItemData: QuizItemData;
}

export const CaPasseOuCaCashContainer: React.FC<CaPasseOuCaCashContainerProps> = ({
  game,
  quizItemData,
}): JSX.Element => {
  const [generateNewCurrentQuizItem] = useMutation(GENERATE_NEW_CURRENT_QUIZ_ITEM, {
    refetchQueries: [
      {
        query: GET_GAME,
        variables: { shortId: game.shortId },
      },
    ],
  });

  const { nonNullQuizItemData } = useNonNullQuizItemData({ quizItemData });

  const { playersAnswers, allPlayersHaveAnswered } = usePlayersAnswers({
    shortId: game.shortId,
    quizItemSignature: quizItemData?.quizItemSignature,
    players: game.players,
  });

  const { remainingTime, questionsRecord } = useQuizLifetime({
    shortId: game.shortId,
    quizItemSignature: nonNullQuizItemData.quizItemSignature,
    allPlayersHaveAnswered,
    duration: EQuizDuration.caPasseOuCaCash,
  });

  const { caPasseOuCaCashState } = useCaPasseOuCaCashState({
    shortId: game.shortId,
    quizItemData,
    allPlayersHaveAnswered,
    playersAnswers,
    quizAnswer: nonNullQuizItemData.quiz.answer,
    quizLevel: nonNullQuizItemData.level,
    questionsRecord,
  });

  React.useEffect(() => {
    if (caPasseOuCaCashState.stateName === "quizInfosScreen_fetchQuizItemData") {
      (async () =>
        await generateNewCurrentQuizItem({
          variables: {
            shortId: game.shortId,
            level: caPasseOuCaCashState.quizLevel,
          },
        }))();
    }
  }, [game.shortId, generateNewCurrentQuizItem, caPasseOuCaCashState]);

  const topScreens = [
    {
      component: (
        <QuestionSummary
          quizAnswer={nonNullQuizItemData.quiz.answer}
          players={game.players}
          playersAnswers={playersAnswers}
          playersPoints={caPasseOuCaCashState.playersPoints}
          additionalPointsAreVisible={caPasseOuCaCashState.stateName === "questionSummary_points"}
        />
      ),
      shouldEnter: caPasseOuCaCashState.stateName.includes("questionSummary"),
      shouldLeave: caPasseOuCaCashState.stateName.includes("playersRanking"),
    },
    {
      component: (
        <PlayersRanking
          playersPoints={{ ...caPasseOuCaCashState.playersPoints }}
          players={game.players}
          isCurrentRanking={
            caPasseOuCaCashState.stateName !== "playersRanking_previous" &&
            caPasseOuCaCashState.stateName !== "questionSummary_points"
          }
        />
      ),
      shouldEnter: caPasseOuCaCashState.stateName.includes("playersRanking"),
      shouldLeave:
        caPasseOuCaCashState.questionNumber !== 9
          ? caPasseOuCaCashState.stateName.includes("quizInfosScreen")
          : false,
    },
    {
      component: (
        <QuizInfosScreen
          questionNumber={caPasseOuCaCashState.questionNumber}
          quizLevel={caPasseOuCaCashState.quizLevel}
        />
      ),
      shouldEnter:
        caPasseOuCaCashState.stateName.includes("quizInfosScreen") ||
        caPasseOuCaCashState.stateName === "question",
      shouldLeave: false,
      wavesBackgroundGradient: getLevelGradient({
        quizLevel: caPasseOuCaCashState.quizLevel,
      }),
    },
  ];

  return (
    <QuizLayout
      stage={game.stage}
      gameName={game.name}
      showTopScreen={caPasseOuCaCashState.stateName in ECaPasseOuCaCashStatesTopScreensStatesNames}
      topScreens={topScreens}
    >
      <div className="d-flex flex-column align-center justify-center flex-grow">
        <QuestionDisplay quizItem={nonNullQuizItemData.quiz} />
        <div className="d-flex justify-center flex-wrap">
          {game.players.map((playerData: PlayerData, index: number) => {
            return (
              <PlayerAnswer
                key={index}
                playerName={playerData.player.name}
                answerType={playersAnswers[playerData.player._id]?.answerType}
                isGoodAnswer={isValidAnswer({
                  answer: nonNullQuizItemData.quiz.answer,
                  givenAnswer: playersAnswers[playerData.player._id]?.answer,
                })}
                noMarginRight={index === game.players.length - 1}
                questionIsOver={questionsRecord[nonNullQuizItemData.quizItemSignature]?.isDone}
              />
            );
          })}
        </div>
      </div>
      <CategoryTheme
        categoryName={nonNullQuizItemData.category.name}
        theme={nonNullQuizItemData.theme}
        subTheme={nonNullQuizItemData.subTheme}
      />
      <TimeBar
        totalTime={EQuizDuration.caPasseOuCaCash}
        remainingTime={remainingTime - 1}
        isOver={game.players.length === Object.keys(playersAnswers).length}
        backgroundGradient={getLevelGradient({
          quizLevel: caPasseOuCaCashState.quizLevel,
        })}
      />
    </QuizLayout>
  );
};
