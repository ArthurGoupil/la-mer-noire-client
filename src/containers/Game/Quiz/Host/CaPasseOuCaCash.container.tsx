import React from "react";

import { QuestionDisplay } from "components/Quiz/Host/QuestionDisplay";
import { Game, PlayerData } from "models/Game.model";
import { TimeBar } from "components/Quiz/Others/TimeBar";
import { PlayerAnswer } from "components/Quiz/Host/PlayerAnswer";
import { useQuizLifetime } from "hooks/quiz/useQuizLifetime.hook";
import { useMutation } from "@apollo/client";
import { GENERATE_NEW_CURRENT_QUIZ_ITEM, GET_GAME } from "services/games.service";
import { QuizItemData } from "models/Quiz.model";
import { usePlayersAnswers } from "hooks/quiz/usePlayersAnswers.hook";
import { EQuizDuration } from "constants/QuizDuration.constants";
import { useCaPasseOuCaCashState } from "hooks/game/useCaPasseOuCaCashState.hook";
import { QuizItemInfos } from "components/Quiz/Host/QuizItemInfos";
import { useNonNullQuizItemData } from "hooks/quiz/useNonNullQuizItemData.hook";
import { QuizLayout } from "components/Quiz/Host/QuizLayout";
import { getQuizLevelGradient } from "utils/quiz/getQuizLevelGradient.util";
import { QuestionSummary } from "components/Quiz/Host/QuestionSummary";
import { PlayersRanking } from "components/Quiz/Host/PlayersRanking";
import { ECaPasseOuCaCashStatesTopScreensStatesNames } from "constants/CaPasseOuCaCash.constants";
import { getCaPasseOuCaCashStateInterpretation } from "utils/quiz/getCaPasseOuCaCashInterpretation.util";
import { StageName } from "components/Quiz/Host/StageName";

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
    quizAnswer: nonNullQuizItemData.quiz.answer,
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

  const {
    fetchQuizItemData,
    showAdditionalPoints,
    questionSummaryEnter,
    questionSummaryLeave,
    showPreviousRanking,
    playersRankingEnter,
    playersRankingLeave,
    showThemeSubTheme,
    quizItemInfosEnter,
    stageNameEnter,
    stageNameCanPlay,
    stageNameLeave,
  } = getCaPasseOuCaCashStateInterpretation({
    caPasseOuCaCashState,
  });

  React.useEffect(() => {
    if (fetchQuizItemData) {
      (async () =>
        await generateNewCurrentQuizItem({
          variables: {
            shortId: game.shortId,
            level: caPasseOuCaCashState.quizLevel,
          },
        }))();
    }
  }, [game.shortId, generateNewCurrentQuizItem, caPasseOuCaCashState, fetchQuizItemData]);

  const topScreens = [
    {
      component: <StageName gameStage={game.stage} canPlaySound={stageNameCanPlay} />,
      shouldEnter: stageNameEnter,
      shouldLeave: stageNameLeave,
    },
    {
      component: (
        <QuestionSummary
          quizAnswer={nonNullQuizItemData.quiz.answer}
          players={game.players}
          playersAnswers={playersAnswers}
          playersPoints={caPasseOuCaCashState.playersPoints}
          showAdditionalPoints={showAdditionalPoints}
        />
      ),
      shouldEnter: questionSummaryEnter,
      shouldLeave: questionSummaryLeave,
    },
    {
      component: (
        <PlayersRanking
          playersPoints={{ ...caPasseOuCaCashState.playersPoints }}
          players={game.players}
          showPreviousRanking={showPreviousRanking}
        />
      ),
      shouldEnter: playersRankingEnter,
      shouldLeave: playersRankingLeave,
    },
    {
      component: (
        <QuizItemInfos
          questionNumber={caPasseOuCaCashState.questionNumber}
          quizLevel={caPasseOuCaCashState.quizLevel}
          theme={nonNullQuizItemData.theme}
          subTheme={nonNullQuizItemData.subTheme}
          showThemeSubTheme={showThemeSubTheme}
        />
      ),
      shouldEnter: quizItemInfosEnter,
      shouldLeave: false,
      wavesBackgroundGradient: getQuizLevelGradient({
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
                isGoodAnswer={playersAnswers[playerData.player._id]?.isGoodAnswer}
                isFirstCash={playersAnswers[playerData.player._id]?.isFirstGoodCash}
                noMarginRight={index === game.players.length - 1}
                questionIsOver={questionsRecord[nonNullQuizItemData.quizItemSignature]?.isDone}
              />
            );
          })}
        </div>
      </div>
      <TimeBar
        totalTime={EQuizDuration.caPasseOuCaCash}
        remainingTime={remainingTime - 0.5}
        isOver={game.players.length === Object.keys(playersAnswers).length}
        backgroundGradient={getQuizLevelGradient({
          quizLevel: caPasseOuCaCashState.quizLevel,
        })}
      />
    </QuizLayout>
  );
};
