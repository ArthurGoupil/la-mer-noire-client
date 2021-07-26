import React from "react";

import { QuestionDisplay } from "components/Quiz/Host/QuestionDisplay";
import { Game, PlayerData } from "models/Game.model";
import { TimeBar } from "components/Quiz/Host/TimeBar";
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
import { getCaPasseOuCaCashMasterInterpretation } from "utils/game/getCaPasseOuCaCashMasterInterpretation.util";
import { StageName } from "components/Quiz/Host/StageName";
import { useCPOCCBackgroundSounds } from "hooks/quiz/useCPOCCBackgroundSounds.hook";
import { FullWidthContainer } from "components/Utils/FullWidthContainer";
import { QuizStage } from "constants/GameStage.constants";

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
    correctAnswer: nonNullQuizItemData.quiz.answer,
  });

  const { caPasseOuCaCashMaster, questionsRecord } = useCaPasseOuCaCashMaster({
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
    timeBarShouldAnimateToEnd,
    displayTimeBar,
  } = getCaPasseOuCaCashMasterInterpretation({
    caPasseOuCaCashMaster,
  });

  useCPOCCBackgroundSounds({ caPasseOuCaCashMasterState: caPasseOuCaCashMaster.state });

  React.useEffect(() => {
    if (fetchQuizItemData) {
      generateNewCurrentQuizItem({
        variables: {
          shortId: game.shortId,
          level: caPasseOuCaCashMaster.quizLevel,
        },
      });
    }
  }, [game.shortId, generateNewCurrentQuizItem, caPasseOuCaCashMaster, fetchQuizItemData]);

  const topScreens = [
    {
      component: <StageName stage={game.stage} canPlaySound={stageNameCanPlay} />,
      shouldEnter: stageNameEnter,
      shouldLeave: stageNameLeave,
    },
    {
      component: (
        <QuestionSummary
          stage={QuizStage.caPasseOuCaCash}
          correctAnswer={nonNullQuizItemData.quiz.answer}
          players={game.players}
          playersAnswers={playersAnswers}
          playersPoints={caPasseOuCaCashMaster.playersPoints}
          showDeltaPoints={showAdditionalPoints}
          currentPlayers={[]}
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
          numberOfQuestions={9}
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
      <FullWidthContainer className="d-flex flex-column align-center justify-center flex-grow">
        <QuestionDisplay quizItem={nonNullQuizItemData.quiz} />
        <div className="d-flex justify-center flex-wrap">
          {game.players.map((playerData: PlayerData, index: number) => {
            return (
              <PlayerAnswer
                key={index}
                playerName={playerData.player.name}
                playerAnswer={playersAnswers[playerData.player._id]}
                noMarginRight={index === game.players.length - 1}
                questionIsOver={questionsRecord[nonNullQuizItemData.quizItemSignature]?.isDone}
              />
            );
          })}
        </div>
      </FullWidthContainer>
      <TimeBar
        displayTimeBar={displayTimeBar}
        duration={QuizDuration.caPasseOuCaCash}
        timestamp={questionsRecord[quizItemData?.quizItemSignature]?.timestamp}
        isOver={questionsRecord[quizItemData?.quizItemSignature]?.isDone}
        shouldAnimateToEnd={timeBarShouldAnimateToEnd}
        soundShouldStop={quizOverSoundShouldStop}
        backgroundGradient={getQuizLevelGradient({
          quizLevel: caPasseOuCaCashMaster.quizLevel,
        })}
      />
    </QuizLayout>
  );
};
