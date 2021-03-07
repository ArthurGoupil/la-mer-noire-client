import { Button } from "components/Utils/Button";
import { FullHeightLayout } from "components/Utils/FullHeightLayout";
import { FullWidthContainer } from "components/Utils/FullWidthContainer";
import { EStyles } from "constants/Styling.constants";
import { SetCurrentAnswerProps } from "hooks/quiz/useCurrentAnswer.hook";
import { Answer, AnswerType } from "models/Game.model";
import React from "react";
import styled from "styled-components";
import { isDesktop } from "utils/isDesktop.util";

interface CashAnswerProps {
  quizItemSignature: string;
  playerId: string;
  answer: string;
  currentAnswer: Answer | null;
  onSubmit: (value: SetCurrentAnswerProps) => Promise<void>;
  questionIsOver: boolean;
}

export const CashAnswer: React.FC<CashAnswerProps> = ({
  quizItemSignature,
  playerId,
  answer,
  currentAnswer,
  onSubmit,
  questionIsOver,
}): JSX.Element => {
  const answerWords = answer.split(/ /);
  const answerWordsRefs = answerWords.map(() => React.createRef<HTMLInputElement>());
  const [givenAnswer, setGivenAnswer] = React.useState<string[]>(answerWords.map(() => ""));

  const longestWord = answerWords.reduce((acc: string, cur: string) => {
    if (cur.length > acc.length) {
      return cur;
    }
    return acc;
  }, "");

  const isPossibleToAnswer =
    quizItemSignature !== currentAnswer?.quizItemSignature && !questionIsOver;
  const isPossibleToSubmit =
    isPossibleToAnswer &&
    givenAnswer.reduce((acc, cur, index) => {
      return acc && cur.length === answerWords[index].length;
    }, true);

  // 60 is 2*20px of main container padding & 2*10px of padding inside input
  // 12.95px is letter width at 18px (default font-size value)
  const fullWidthFactor =
    longestWord.length > 7
      ? (window.innerWidth - 60) / (longestWord.length * 12.95)
      : (window.innerWidth - 60) / (9 * 12.95);

  return (
    <FullHeightLayout
      height="100%"
      padding="0"
      className="d-flex flex-column align-center flex-grow"
    >
      <FullWidthContainer className="d-flex flex-column align-start">
        <InputsContainer className="d-flex flex-column align-start">
          {givenAnswer.map((word: string, wordIndex: number) => {
            const inputWidth = answerWords[wordIndex].length * 12.95 * fullWidthFactor + 20;
            const fontSize = 18 * fullWidthFactor;
            const lineHeight = 25 * fullWidthFactor;
            const letterSpacing = 2 * fullWidthFactor;
            const placeholdersContainerWidth = inputWidth - 20;

            return (
              <InputWrapper
                key={wordIndex}
                width={inputWidth}
                fullWidthFactor={fullWidthFactor}
                className="d-flex justify-center"
              >
                <InputPlaceholdersContainer
                  width={placeholdersContainerWidth}
                  className="d-flex  align-end"
                >
                  {answerWords[wordIndex].split("").map((letter, letterIndex) => {
                    // 12.95px of letter width - 2px of letterSpacing
                    const placeholderWidth = (12.95 - 2) * fullWidthFactor;
                    // 1.85px is a little bit less than letterSpacing
                    const marginLeft = letterIndex === 0 ? 0 : 1.85 * fullWidthFactor;
                    return (
                      <InputPlaceholder
                        key={letterIndex}
                        width={placeholderWidth}
                        marginLeft={marginLeft}
                      />
                    );
                  })}
                </InputPlaceholdersContainer>
                <Input
                  type="text"
                  autoFocus={wordIndex === 0}
                  ref={answerWordsRefs[wordIndex]}
                  spellCheck="false"
                  value={givenAnswer[wordIndex]}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                      wordIndex !== 0 &&
                      givenAnswer[wordIndex].length === 0
                    ) {
                      answerWordsRefs[wordIndex - 1].current?.focus();
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.value.length < answerWords[wordIndex].length) {
                      givenAnswer[wordIndex] = e.target.value.toUpperCase();
                      setGivenAnswer([...givenAnswer]);
                    } else if (
                      wordIndex !== answerWords.length - 1 &&
                      e.target.value.length === answerWords[wordIndex].length
                    ) {
                      givenAnswer[wordIndex] = e.target.value.toUpperCase();
                      setGivenAnswer([...givenAnswer]);
                      answerWordsRefs[wordIndex + 1].current?.focus();
                    } else if (e.target.value.length === answerWords[wordIndex].length) {
                      givenAnswer[wordIndex] = e.target.value.toUpperCase();
                      setGivenAnswer([...givenAnswer]);
                    }
                  }}
                  fontSize={fontSize}
                  lineHeight={lineHeight}
                  letterSpacing={letterSpacing}
                  disabled={!isPossibleToAnswer}
                />
              </InputWrapper>
            );
          })}
        </InputsContainer>
        <Button
          label={
            isPossibleToAnswer
              ? "Répondre"
              : questionIsOver && currentAnswer?.quizItemSignature !== quizItemSignature
              ? "Too late !"
              : "Réponse envoyée !"
          }
          onClick={async () =>
            await onSubmit({
              answer: givenAnswer.join(" "),
              answerType: AnswerType.cash,
              playerId,
            })
          }
          margin="0"
          disabled={!isPossibleToSubmit}
        />
      </FullWidthContainer>
      {!isDesktop() && (
        <div className="d-flex flex-grow align-center">
          <Button
            label="Afficher le clavier"
            backgroundColor={EStyles.blue}
            borderColor={EStyles.blue}
            hoverColor={EStyles.darken_blue}
            onClick={() => {
              answerWordsRefs[0]?.current?.focus();
            }}
            margin="0 10px"
            disabled={!isPossibleToAnswer}
          />
        </div>
      )}
    </FullHeightLayout>
  );
};

const InputsContainer = styled.div`
  width: 100%;
  padding-top: 10px;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div<{
  width: number | undefined;
  fullWidthFactor: number;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => 25 * props.fullWidthFactor + 10}px;
  margin: 5px 0;
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: ${(props) => 5 * props.fullWidthFactor}px;
`;

const Input = styled.input<{
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}>`
  font-family: "Roboto Mono", monospace;
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => props.lineHeight}px;
  color: white;
  border: none;
  background-color: transparent;
  text-align: left;
  outline-color: ${EStyles.turquoise};
  letter-spacing: ${(props) => props.letterSpacing}px;
  padding: 10px;

  position: absolute;
`;

const InputPlaceholdersContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  height: 100%;
  position: absolute;
  bottom: 10%;
  pointer-events: none;
`;

const InputPlaceholder = styled.div<{ width: number; marginLeft: number }>`
  width: ${(props) => props.width}px;
  height: 3px;
  background-color: ${EStyles.lightBlue};
  pointer-events: none;
  margin-left: ${(props) => props.marginLeft}px;
  border-radius: 5px;
`;
