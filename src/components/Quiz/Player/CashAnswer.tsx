import React from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components";

import { Answer } from "models/Game";
import EStyles from "constants/Styling.constants";
import FullHeightContainer from "components/Utils/FullHeightContainer";
import Button from "components/Utils/Button";
import { setCookie } from "utils/cookies.utils";
import ECookieName from "constants/Cookies.constants";
import { GIVE_ANSWER } from "services/games.service";
import useCookie from "hooks/useCookie";
import getLettersRecordFromString from "utils/Quiz/getLettersRecordFromString";
import FullWidthContainer from "components/Utils/FullWidthContainer";

interface CashAnswerProps {
  shortId: string;
  quizId: string;
  playerId: string;
  answer: string;
  setSelectedAnswer: (value: React.SetStateAction<Answer | null>) => void;
  givenTimeInSeconds?: number;
}

interface GetLetterIndexInFullAnswerProps {
  wordIndex: number;
  letterIndex: number;
  answerWords: string[];
}

const getLetterIndexInFullAnswer = ({
  wordIndex,
  letterIndex,
  answerWords,
}: GetLetterIndexInFullAnswerProps): number => {
  let letterIndexInFullAnswer = 0;
  for (let i = 0; i <= wordIndex; i++) {
    if (i === wordIndex) {
      letterIndexInFullAnswer += letterIndex;
    } else {
      letterIndexInFullAnswer += answerWords[i].length;
    }
  }
  return letterIndexInFullAnswer;
};

const CashAnswer: React.FC<CashAnswerProps> = ({
  shortId,
  quizId,
  playerId,
  answer,
  setSelectedAnswer,
  givenTimeInSeconds = 20,
}): JSX.Element => {
  const [giveAnswer] = useMutation(GIVE_ANSWER);

  const currentAnswer = useCookie<Answer>({
    prefix: shortId,
    cookieName: ECookieName.currentAnswer,
  });

  React.useEffect(() => {
    if (currentAnswer?.quizId === quizId) {
      setAnswerLettersValues(
        getLettersRecordFromString({
          word: currentAnswer.answer,
          isEmptyString: false,
        }),
      );
    }
  }, []);

  const [isTooLate, setIsTooLate] = React.useState<boolean>(false);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentAnswer?.quizId !== quizId) {
      timeout = setTimeout(() => {
        setIsTooLate(true);
      }, givenTimeInSeconds * 1000);
    }
    answerLettersRefsRecord[0]?.current?.focus();
    return () => clearTimeout(timeout);
  }, []);

  const [answerLettersValues, setAnswerLettersValues] = React.useState<
    Record<string, string>
  >(getLettersRecordFromString({ word: answer, isEmptyString: true }));

  let longestWordLength = 0;

  const answerWords = answer.split(" ");
  const answerLettersRefsRecord: Record<
    string,
    React.RefObject<HTMLInputElement>
  > = {};
  answerWords.forEach((word, wordIndex) => {
    if (word.length > longestWordLength) {
      longestWordLength = word.length;
    }
    word.split("").forEach((letter, letterIndex) => {
      const ref = React.createRef();
      const letterIndexInFullAnswer = getLetterIndexInFullAnswer({
        wordIndex,
        letterIndex,
        answerWords,
      });
      answerLettersRefsRecord[
        letterIndexInFullAnswer
      ] = ref as React.RefObject<HTMLInputElement>;
    });
  });

  // innerWidth minus padding, minus margin of each input
  const inputWidth =
    longestWordLength > 4
      ? (window.innerWidth - 20 - longestWordLength * 4) / longestWordLength
      : (window.innerWidth - 20 - 4 * 4) / 4;

  const handleAnswer = async () => {
    setSelectedAnswer({
      quizId,
      answer: Object.values(answerLettersValues).join(""),
    });
    setCookie({
      prefix: shortId,
      cookieName: ECookieName.currentAnswer,
      cookieValue: {
        quizId,
        answer: Object.values(answerLettersValues).join(""),
      },
    });
    await giveAnswer({
      variables: {
        shortId,
        playerId,
        answer: Object.values(answerLettersValues).join(""),
      },
    });
  };

  const isPossibleToAnswer = quizId !== currentAnswer?.quizId && !isTooLate;

  return (
    <FullHeightContainer
      padding={0}
      className="d-flex flex-column align-center justify-center"
    >
      <InputsAndButtonContainer>
        <InputsContainer>
          {answerWords.map((word, wordIndex) => {
            return (
              <div key={wordIndex} className="d-flex flex-wrap">
                {word.split("").map((letter, letterIndex) => {
                  const letterIndexInFullAnswer = getLetterIndexInFullAnswer({
                    wordIndex,
                    letterIndex,
                    answerWords,
                  });

                  return (
                    <Input
                      readOnly={!isPossibleToAnswer}
                      ref={answerLettersRefsRecord[letterIndexInFullAnswer]}
                      key={letterIndex}
                      className="d-flex justify-center align-center"
                      value={answerLettersValues[
                        letterIndexInFullAnswer
                      ].toUpperCase()}
                      onClick={() => {
                        answerLettersRefsRecord[
                          letterIndexInFullAnswer
                        ].current?.setSelectionRange(1, 1);
                      }}
                      onKeyDown={(e) => {
                        if (isPossibleToAnswer) {
                          if (e.key.length === 1) {
                            setAnswerLettersValues({
                              ...answerLettersValues,
                              [letterIndexInFullAnswer]: e.key,
                            });
                            answerLettersRefsRecord[
                              letterIndexInFullAnswer + 1
                            ]?.current?.focus();
                          } else if (e.key === "Backspace") {
                            setAnswerLettersValues({
                              ...answerLettersValues,
                              [letterIndexInFullAnswer]: "",
                            });
                            answerLettersRefsRecord[
                              letterIndexInFullAnswer - 1
                            ]?.current?.focus();
                          } else if (e.key === "Enter") {
                            handleAnswer();
                          }
                        }
                      }}
                      onChange={() => {}}
                      inputWidth={inputWidth}
                      tabIndex={0}
                    />
                  );
                })}
              </div>
            );
          })}
        </InputsContainer>
        <Button
          label={
            quizId === currentAnswer?.quizId
              ? "Déjà répondu !"
              : isTooLate
              ? "Too late !"
              : "Répondre"
          }
          onClick={handleAnswer}
          disabled={!isPossibleToAnswer}
        />
      </InputsAndButtonContainer>
      <FullWidthContainer className="d-flex flex-start">
        <TimeBar disabled={!isPossibleToAnswer} />
      </FullWidthContainer>
    </FullHeightContainer>
  );
};

const InputsAndButtonContainer = styled.div`
  margin-bottom: 80px;
`;

const Input = styled.input<{ inputWidth: number }>`
  width: ${(props) => props.inputWidth}px;
  height: ${(props) => props.inputWidth}px;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  margin: 2px;
  border-radius: 5px;
  color: white;
  text-align: center;
  vertical-align: middle;
  outline-color: ${EStyles.turquoise};
  font-size: ${(props) => props.inputWidth * 0.7}px;
  line-height: ${(props) => props.inputWidth * 0.7}px;
`;

const InputsContainer = styled.div`
  margin-bottom: 20px;
`;

const TimeBar = styled.div<{ disabled: boolean }>`
  width: 100%;
  height: 40px;
  background-color: ${EStyles.red};
  animation: transformX 20s linear;
  border-radius: 5px;
  opacity: ${(props) => (props.disabled ? 0 : 1)};
  transition: opacity 1s;
  position: absolute;
  top: 0;

  @keyframes transformX {
    from {
      width: 0%;
    }
  }
`;

export default CashAnswer;
