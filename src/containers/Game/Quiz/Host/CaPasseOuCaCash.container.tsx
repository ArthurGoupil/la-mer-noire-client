import React from "react";

import { FullWidthContainer } from "components/Utils/FullWidthContainer";
import { CategoryTheme } from "components/Quiz/Host/CategoryTheme";
import { QuestionDisplay } from "components/Quiz/Host/Question";
import { CaPasseOuCaCashState, Game, PlayerData } from "models/Game.model";
import { isValidAnswer } from "utils/quiz/isValidAnswer.util";
import { TimeBar } from "components/Quiz/Others/TimeBar";
import { PlayerAnswer } from "components/Quiz/Host/PlayerAnswer";
import { useQuizLifetime } from "hooks/quiz/useQuizLifetime.hook";
import { useMutation } from "@apollo/client";
import {
  GENERATE_NEW_CURRENT_QUIZ_ITEM,
  GET_GAME,
} from "services/games.service";
import { FullHeightLoader } from "components/Utils/FullHeightLoader";
import { FullScreenError } from "components/Utils/FullScreenError";
import { QuizItemData } from "models/Quiz.model";
import { getNS } from "utils/networkStatus.util";
import { usePlayersAnswers } from "hooks/quiz/usePlayersAnswers.hook";
import { EQuizDuration } from "constants/QuizDuration.constants";
import { getCookie, setCookie } from "utils/cookies.util";
import { ECookieName } from "constants/Cookies.constants";
import {
  getLevelByQuestionNumber,
  QuestionNumber,
} from "utils/quiz/getLevelByQuestionNumber.util";
import { useCaPasseOuCaCashQuestionSummary } from "hooks/game/useCaPasseOuCaCashQuestionSummary.hook";
import { LevelAndAnswerTypePoints } from "components/Quiz/Host/LevelAndAnswerTypePoints";
import { SummaryTransition } from "components/Quiz/Host/SummaryTransition";

interface CaPasseOuCaCashContainerProps {
  game: Game;
  quizItemData: QuizItemData;
}

export const CaPasseOuCaCashContainer: React.FC<CaPasseOuCaCashContainerProps> = ({
  game,
  quizItemData,
}): JSX.Element => {
  const [
    generateNewCurrentQuizItem,
    { loading: isGeneratingNewCurrentQuizItem },
  ] = useMutation(GENERATE_NEW_CURRENT_QUIZ_ITEM, {
    refetchQueries: [
      {
        query: GET_GAME,
        variables: { shortId: game.shortId },
      },
    ],
  });

  const caPasseOuCaCashState: CaPasseOuCaCashState = getCookie<CaPasseOuCaCashState>(
    {
      prefix: game.shortId,
      cookieName: ECookieName.caPasseOuCaCashState,
    },
  );

  const { playersAnswers, allPlayersHaveAnswered } = usePlayersAnswers({
    shortId: game.shortId,
    quizItemData,
    players: game.players,
    isGeneratingNewCurrentQuizItem,
  });

  const { remainingTime, doneQuestionsRecord, networkStatus } = useQuizLifetime(
    {
      shortId: game.shortId,
      quizId: quizItemData.quizId,
      allPlayersHaveAnswered,
      timestampReference: quizItemData.createdAtTimestamp,
      duration: EQuizDuration.caPasseOuCaCash,
    },
  );

  const { questionSummary } = useCaPasseOuCaCashQuestionSummary({
    previousPlayersPoints: caPasseOuCaCashState.playersPoints,
    playersAnswers,
    quizAnswer: quizItemData.quiz.answer,
    quizLevel: quizItemData.level,
    questionIsOver: doneQuestionsRecord[quizItemData.quizId],
  });

  const [
    isReadyForNextQuestion,
    setIsReadyForNextQuestion,
  ] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isReadyForNextQuestion && questionSummary) {
      const newQuestionNumber: QuestionNumber = (caPasseOuCaCashState.questionNumber +
        1) as QuestionNumber;

      if (newQuestionNumber < 10) {
        setCookie({
          prefix: game.shortId,
          cookieName: ECookieName.caPasseOuCaCashState,
          cookieValue: {
            questionNumber: newQuestionNumber,
            playersPoints: Object.keys(questionSummary).reduce(
              (acc: Record<string, number>, cur: string) => {
                return { ...acc, [cur]: questionSummary[cur].totalPoints };
              },
              {},
            ),
          },
        });
        setTimeout(() => {
          (async () =>
            await generateNewCurrentQuizItem({
              variables: {
                shortId: game.shortId,
                level: getLevelByQuestionNumber({
                  questionNumber: newQuestionNumber,
                }),
              },
            }))();
          setIsReadyForNextQuestion(false);
        }, 3000);
      }
    }
  }, [isReadyForNextQuestion, questionSummary]);

  return {
    ready: (
      <FullWidthContainer className="d-flex flex-column align-center space-between flex-grow">
        <div className="d-flex flex-column align-center justify-center flex-grow">
          <FullWidthContainer className="d-flex flex-start align-end">
            <LevelAndAnswerTypePoints level={quizItemData.level} />
          </FullWidthContainer>
          <QuestionDisplay quizItem={quizItemData.quiz} showAnswers={false} />
          <div className="d-flex">
            {game.players.map((playerData: PlayerData, index: number) => {
              return (
                <PlayerAnswer
                  key={index}
                  playerName={playerData.player.name}
                  answerType={playersAnswers[playerData.player._id]?.answerType}
                  isGoodAnswer={isValidAnswer({
                    answer: quizItemData.quiz.answer,
                    givenAnswer: playersAnswers[playerData.player._id]?.answer,
                  })}
                  noMarginRight={index === game.players.length - 1}
                  questionIsOver={doneQuestionsRecord[quizItemData.quizId]}
                />
              );
            })}
          </div>
        </div>
        <CategoryTheme
          categoryName={quizItemData.category.name}
          theme={quizItemData.theme}
          subTheme={quizItemData.subTheme}
        />
        <TimeBar
          totalTime={EQuizDuration.caPasseOuCaCash}
          remainingTime={remainingTime - 1}
          isOver={game.players.length === Object.keys(playersAnswers).length}
          isHost
        />
        {questionSummary && doneQuestionsRecord[quizItemData.quizId] && (
          <SummaryTransition
            quizAnswer={quizItemData.quiz.answer}
            questionSummary={questionSummary}
            players={game.players}
            onReady={() => setIsReadyForNextQuestion(true)}
          />
        )}
      </FullWidthContainer>
    ),
    loading: <FullHeightLoader />,
    error: (
      <FullScreenError errorLabel="Erreur de communication avec le serveur. Veuillez recharger la page." />
    ),
  }[getNS(networkStatus)];
};
