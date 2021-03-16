import React from "react";

import { QuestionDisplay } from "components/Quiz/Host/QuestionDisplay";
import { Game, PlayerData } from "models/Game.model";
import { TimeBar } from "components/Quiz/Others/TimeBar";
import { PlayerAnswer } from "components/Quiz/Host/PlayerAnswer";
import { useMutation } from "@apollo/client";
import { GENERATE_NEW_CURRENT_QUIZ_ITEM, GET_GAME } from "services/games.service";
import { QuizItemData } from "models/Quiz.model";
import { usePlayersAnswers } from "hooks/quiz/usePlayersAnswers.hook";
import { QuizDuration } from "constants/QuizDuration.constants";
import { useCaPasseOuCaCashMaster } from "hooks/game/useCaPasseOuCaCashMaster.hook";
import { QuizItemInfos } from "components/Quiz/Host/QuizItemInfos";
import { useNonNullQuizItemData } from "hooks/quiz/useNonNullQuizItemData.hook";
import { QuizLayout } from "components/Quiz/Host/QuizLayout";
import { getQuizLevelGradient } from "utils/quiz/getQuizLevelGradient.util";
import { QuestionSummary } from "components/Quiz/Host/QuestionSummary";
import { PlayersRanking } from "components/Quiz/Host/PlayersRanking";
import { CaPasseOuCaCashTopScreensStates } from "constants/CaPasseOuCaCash.constants";
import { getCaPasseOuCaCashMasterInterpretation } from "utils/quiz/getCaPasseOuCaCashInterpretation.util";
import { StageName } from "components/Quiz/Host/StageName";
import { useBackgroundSounds } from "hooks/quiz/useBackgroundSounds.hook";

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

  const { caPasseOuCaCashMaster, questionsRecord, remainingTime } = useCaPasseOuCaCashMaster({
    shortId: game.shortId,
    quizItemData,
    allPlayersHaveAnswered,
    playersAnswers,
    quizItemSignature: nonNullQuizItemData.quizItemSignature,
    quizLevel: nonNullQuizItemData.level,
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
    quizOverSoundShouldStop,
    timeBarIsVisible,
  } = getCaPasseOuCaCashMasterInterpretation({
    caPasseOuCaCashMaster,
  });

  useBackgroundSounds({ caPasseOuCaCashMasterState: caPasseOuCaCashMaster.state });

  React.useEffect(() => {
    if (fetchQuizItemData) {
      (async () =>
        await generateNewCurrentQuizItem({
          variables: {
            shortId: game.shortId,
            level: caPasseOuCaCashMaster.quizLevel,
          },
        }))();
    }
  }, [game.shortId, generateNewCurrentQuizItem, caPasseOuCaCashMaster, fetchQuizItemData]);

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
          playersPoints={caPasseOuCaCashMaster.playersPoints}
          showAdditionalPoints={showAdditionalPoints}
        />
      ),
      shouldEnter: questionSummaryEnter,
      shouldLeave: questionSummaryLeave,
    },
    {
      component: (
        <PlayersRanking
          playersPoints={{ ...caPasseOuCaCashMaster.playersPoints }}
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
          questionNumber={caPasseOuCaCashMaster.questionNumber}
          quizLevel={caPasseOuCaCashMaster.quizLevel}
          theme={nonNullQuizItemData.theme}
          subTheme={nonNullQuizItemData.subTheme}
          showThemeSubTheme={showThemeSubTheme}
        />
      ),
      shouldEnter: quizItemInfosEnter,
      shouldLeave: false,
      wavesBackgroundGradient: getQuizLevelGradient({
        quizLevel: caPasseOuCaCashMaster.quizLevel,
      }),
    },
  ];

  return (
    <QuizLayout
      stage={game.stage}
      gameName={game.name}
      showTopScreen={caPasseOuCaCashMaster.state in CaPasseOuCaCashTopScreensStates}
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
        timeBarIsVisible={timeBarIsVisible}
        totalTime={QuizDuration.caPasseOuCaCash}
        remainingTime={remainingTime}
        isOver={questionsRecord[nonNullQuizItemData.quizItemSignature]?.isDone}
        soundShouldStop={quizOverSoundShouldStop}
        backgroundGradient={getQuizLevelGradient({
          quizLevel: caPasseOuCaCashMaster.quizLevel,
        })}
      />
    </QuizLayout>
  );
};
