import React from "react";
import styled from "styled-components";

import { Answer } from "models/Game.model";
import EStyles from "constants/Styling.constants";
import FullHeightContainer from "components/Utils/FullHeightContainer";
import Button from "components/Utils/Button";
import ECookieName from "constants/Cookies.constants";
import getLettersRecordFromString from "utils/Quiz/getLettersRecordFromString.util";
import getLetterIndexInSentence from "utils/Quiz/getLetterIndexInSentence.util";
import useSetAnswer from "hooks/useSetAnswer.hook";
import { getCookie } from "utils/cookies.util";
import isDesktop from "utils/isDesktop.util";

interface CashAnswerProps {
  shortId: string;
  quizId: string;
  playerId: string;
  answer: string;
  setSelectedAnswer: (value: React.SetStateAction<Answer | null>) => void;
}

const CashAnswer: React.FC<CashAnswerProps> = ({
  shortId,
  quizId,
  playerId,
  answer,
  setSelectedAnswer,
}): JSX.Element => {
  const [
    answerLettersValuesRecord,
    setAnswerLettersValuesRecord,
  ] = React.useState<Record<string, string>>(
    getLettersRecordFromString({ word: answer, returnsEmptyString: true }),
  );

  const setAnswer = useSetAnswer();

  const currentAnswer = getCookie<Answer>({
    prefix: shortId,
    cookieName: ECookieName.currentAnswer,
  });

  React.useEffect(() => {
    if (currentAnswer?.quizId === quizId) {
      setAnswerLettersValuesRecord(
        getLettersRecordFromString({
          word: currentAnswer.answer,
          returnsEmptyString: false,
        }),
      );
    }
  }, []);

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
      const letterIndexInFullAnswer = getLetterIndexInSentence({
        sentence: answerWords,
        wordIndex,
        letterIndex,
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

  const isPossibleToAnswer = quizId !== currentAnswer?.quizId;
  const isPossibleToSubmit =
    isPossibleToAnswer &&
    Object.keys(answerLettersValuesRecord).reduce((acc, cur) => {
      return (
        acc &&
        answerLettersValuesRecord[cur].length === 1 &&
        answerLettersValuesRecord[cur] !== " "
      );
    }, true);

  return (
    <FullHeightContainer
      padding={0}
      className="d-flex flex-column align-center"
    >
      <div className="d-flex flex-column">
        <InputsContainer>
          {answerWords.map((word, wordIndex) => {
            return (
              <div key={wordIndex} className="d-flex flex-wrap">
                {word.split("").map((letter, letterIndex) => {
                  const letterIndexInFullAnswer = getLetterIndexInSentence({
                    sentence: answerWords,
                    wordIndex,
                    letterIndex,
                  });

                  return (
                    <Input
                      type="text"
                      autoFocus={letterIndexInFullAnswer === 0}
                      readOnly={!isPossibleToAnswer}
                      ref={answerLettersRefsRecord[letterIndexInFullAnswer]}
                      key={letterIndex}
                      className="d-flex justify-center align-center"
                      value={answerLettersValuesRecord[
                        letterIndexInFullAnswer
                      ]?.toUpperCase()}
                      onClick={() => {
                        answerLettersRefsRecord[
                          letterIndexInFullAnswer
                        ].current?.setSelectionRange(1, 1);
                      }}
                      onKeyDown={(e) => {
                        if (isPossibleToAnswer) {
                          if (e.key === "Backspace") {
                            setAnswerLettersValuesRecord({
                              ...answerLettersValuesRecord,
                              [letterIndexInFullAnswer]: "",
                            }),
                              answerLettersRefsRecord[
                                letterIndexInFullAnswer - 1
                              ]?.current?.focus();
                          } else if (e.key === "Enter") {
                            setAnswer({
                              shortId,
                              quizId,
                              answer: Object.values(
                                answerLettersValuesRecord,
                              ).join(""),
                              answerType: "cash",
                              playerId,
                              setSelectedAnswer,
                            });
                          }
                        }
                      }}
                      onChange={(e) => {
                        setAnswerLettersValuesRecord({
                          ...answerLettersValuesRecord,
                          [letterIndexInFullAnswer]: e.target.value.slice(
                            e.target.value.length - 1,
                          ),
                        });
                        if (e.target.value.length > 0) {
                          answerLettersRefsRecord[
                            letterIndexInFullAnswer + 1
                          ]?.current?.focus();
                        }
                      }}
                      inputWidth={inputWidth}
                    />
                  );
                })}
              </div>
            );
          })}
        </InputsContainer>
        <Button
          label={isPossibleToAnswer ? "Répondre" : "Réponse envoyée !"}
          onClick={() =>
            setAnswer({
              shortId,
              quizId,
              answer: Object.values(answerLettersValuesRecord).join(""),
              answerType: "cash",
              playerId,
              setSelectedAnswer,
            })
          }
          margin="0 10px"
          disabled={!isPossibleToSubmit}
        />
      </div>
      {!isDesktop() && (
        <div className="d-flex flex-grow align-center">
          <Button
            label="Afficher le clavier"
            backgroundColor={EStyles.blue}
            borderColor={EStyles.blue}
            hoverColor={EStyles.darken_blue}
            onClick={() => {
              answerLettersRefsRecord[0]?.current?.focus();
            }}
            margin="0 10px"
            disabled={!isPossibleToAnswer}
          />
        </div>
      )}
    </FullHeightContainer>
  );
};

const Input = styled.input<{ inputWidth: number }>`
  width: ${(props) => props.inputWidth}px;
  height: ${(props) => props.inputWidth}px;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  margin: 12px 2px 2px 2px;
  border-radius: 5px;
  text-align: center;
  vertical-align: middle;
  outline-color: ${EStyles.turquoise};
  font-size: ${(props) => props.inputWidth * 0.7}px;
  line-height: ${(props) => props.inputWidth * 0.7}px;
`;

const InputsContainer = styled.div`
  margin-bottom: 20px;
`;

export default CashAnswer;
