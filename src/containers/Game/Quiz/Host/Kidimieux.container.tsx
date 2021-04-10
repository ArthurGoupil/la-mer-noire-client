import React from "react";
import { useMutation } from "@apollo/client";

import { Game } from "models/Game.model";
import { QuizItemData } from "models/Quiz.model";
import { GENERATE_NEW_CURRENT_QUIZ_ITEM, GET_GAME } from "services/games.service";
import { useNonNullQuizItemData } from "hooks/quiz/useNonNullQuizItemData.hook";
import { usePlayersAnswers } from "hooks/quiz/usePlayersAnswers.hook";
import { useKidimieuxMaster } from "hooks/game/useKidimieuxMaster.hook";
import { QuizItemInfos } from "components/Quiz/Host/QuizItemInfos";
import { QuizLayout } from "components/Quiz/Host/QuizLayout";
import { getKidimieuxMasterInterpretation } from "utils/quiz/getKidimieuxMasterInterpretation.util";
import { QuestionDisplay } from "components/Quiz/Host/QuestionDisplay";
import { TimeBar } from "components/Quiz/Host/TimeBar";
import { QuizDuration } from "constants/QuizDuration.constants";
import { getQuizLevelGradient } from "utils/quiz/getQuizLevelGradient.util";
import { KidimieuxAnswerType } from "components/Quiz/Host/KidimieuxAnswerType";
import { FullWidthContainer } from "components/Utils/FullWidthContainer";
import { StageName } from "components/Quiz/Host/StageName";
import { QuestionSummary } from "components/Quiz/Host/QuestionSummary";
import { PlayersRanking } from "components/Quiz/Host/PlayersRanking";
import { KidimieuxTopScreensStates } from "constants/Kidimieux.constants";
import { QuizStage } from "constants/GameStage.constants";
import { useKidimieuxBackgroundSounds } from "hooks/quiz/useKidimieuxBackgroundSounds.hook";

interface KidimieuxContainerProps {
  game: Game;
  quizItemData: QuizItemData;
}

export const Kidimieux: React.FC<KidimieuxContainerProps> = ({
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

  const { playersAnswers } = usePlayersAnswers({
    shortId: game.shortId,
    quizItemSignature: quizItemData?.quizItemSignature,
    players: game.players,
    quizAnswer: nonNullQuizItemData.quiz.answer,
  });

  const { kidimieuxMaster, questionsRecord, playersBuzz } = useKidimieuxMaster({
    shortId: game.shortId,
    quizItemData,
    playersAnswers,
    quizItemSignature: nonNullQuizItemData?.quizItemSignature,
    quizLevel: nonNullQuizItemData.level,
    players: game.players,
    currentPlayers: game.currentQuizItem.currentPlayers,
  });

  useKidimieuxBackgroundSounds({ kidimieuxMasterState: kidimieuxMaster.state });

  const {
    stageNameEnter,
    stageNameCanPlay,
    stageNameLeave,
    quizItemInfosEnter,
    showThemeSubTheme,
    fetchQuizItemData,
    shouldResetKidimieuxSounds,
    playerMustAnswer,
    kidimieuxSoundCanPlay,
    showInternalTimeBar,
    displayTimeBar,
    timeBarTimestamp,
    timeBarIsOver,
    timeBarShouldAnimateToEnd,
    timeBarSoundShouldStop,
    questionSummaryEnter,
    questionSummaryLeave,
    showDeltaPoints,
    showPreviousRanking,
    playersRankingEnter,
    playersRankingLeave,
  } = getKidimieuxMasterInterpretation({
    kidimieuxMaster,
    playersCanBuzz: game.currentQuizItem.playersCanBuzz,
    playersCanAnswer: game.currentQuizItem.playersCanAnswer,
    questionRecord: questionsRecord[quizItemData?.quizItemSignature],
    playersBuzz,
    playersAnswers,
  });

  React.useEffect(() => {
    if (fetchQuizItemData) {
      generateNewCurrentQuizItem({
        variables: {
          shortId: game.shortId,
          level: kidimieuxMaster.quizLevel,
        },
      });
    }
  }, [fetchQuizItemData, game.shortId, generateNewCurrentQuizItem, kidimieuxMaster.quizLevel]);

  const topScreens = [
    {
      component: <StageName stage={game.stage} canPlaySound={stageNameCanPlay} />,
      shouldEnter: stageNameEnter,
      shouldLeave: stageNameLeave,
    },
    {
      component: (
        <QuestionSummary
          stage={QuizStage.kidimieux}
          quizAnswer={nonNullQuizItemData.quiz.answer}
          players={game.players}
          playersAnswers={playersAnswers}
          playersPoints={kidimieuxMaster.playersPoints}
          showDeltaPoints={showDeltaPoints}
          currentPlayers={game.currentQuizItem.currentPlayers}
        />
      ),
      shouldEnter: questionSummaryEnter,
      shouldLeave: questionSummaryLeave,
    },
    {
      component: (
        <PlayersRanking
          playersPoints={{ ...kidimieuxMaster.playersPoints }}
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
          numberOfQuestions={6}
          questionNumber={kidimieuxMaster.questionNumber}
          quizLevel={kidimieuxMaster.quizLevel}
          theme={nonNullQuizItemData.theme}
          subTheme={nonNullQuizItemData.subTheme}
          showThemeSubTheme={showThemeSubTheme}
        />
      ),
      shouldEnter: quizItemInfosEnter,
      shouldLeave: false,
      wavesBackgroundGradient: getQuizLevelGradient({
        quizLevel: kidimieuxMaster.quizLevel,
      }),
    },
  ];

  return (
    <QuizLayout
      stage={game.stage}
      gameName={game.name}
      showTopScreen={kidimieuxMaster.state in KidimieuxTopScreensStates}
      topScreens={topScreens}
    >
      <FullWidthContainer className="d-flex flex-column align-center justify-center flex-grow">
        <QuestionDisplay quizItem={nonNullQuizItemData.quiz} />
      </FullWidthContainer>
      <FullWidthContainer>
        <KidimieuxAnswerType
          players={game.players}
          quizLevel={kidimieuxMaster.quizLevel}
          playersAnswers={playersAnswers}
          playersBuzz={playersBuzz}
          playerMustAnswer={playerMustAnswer}
          showInternalTimeBar={showInternalTimeBar}
          kidimieuxSoundCanPlay={kidimieuxSoundCanPlay}
          shouldResetKidimieuxSounds={shouldResetKidimieuxSounds}
        />
        <TimeBar
          displayTimeBar={displayTimeBar}
          duration={QuizDuration.kidimieux}
          timestamp={timeBarTimestamp}
          isOver={timeBarIsOver}
          shouldAnimateToEnd={timeBarShouldAnimateToEnd}
          soundShouldStop={timeBarSoundShouldStop}
          backgroundGradient={getQuizLevelGradient({
            quizLevel: kidimieuxMaster.quizLevel,
          })}
        />
      </FullWidthContainer>
    </QuizLayout>
  );
};
