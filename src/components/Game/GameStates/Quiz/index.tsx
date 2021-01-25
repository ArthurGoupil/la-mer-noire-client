import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";
import { Game } from "models/Game";
import FullContainer from "components/Utils/FullContainer";
import LMNLogo from "components/Utils/LMNLogo";
import { QuizItem } from "models/Quiz";

interface QuizProps {
  shortId: string;
  userType: string;
  gameData: {
    getGame: Game;
  };
}

const Quiz: React.FC<QuizProps> = ({
  shortId,
  userType,
  gameData,
}): JSX.Element => {
  const { quiz, level, itemId } = gameData.getGame.currentState.question;
  const currentQuizItem = quiz.quizItems[level].find(
    (quiz) => quiz._id === Number(itemId),
  );

  return (
    <FullContainer className="d-flex flex-column align-center space-around">
      {userType === "host" ? (
        <>
          <LMNLogo width="400px" margin={`20px 0 20px 0`} />
          <QuizContainer>
            {currentQuizItem?.question ||
              "Erreur ! Le quiz n'a pas été trouvé."}
          </QuizContainer>
        </>
      ) : (
        currentQuizItem && <PlayerView currentQuizItem={currentQuizItem} />
      )}
    </FullContainer>
  );
};

interface PlayerViewProps {
  currentQuizItem: QuizItem;
}

const PlayerView = ({ currentQuizItem }: PlayerViewProps): JSX.Element => {
  return (
    <PlayerViewContainer className="d-flex flex-column">
      <ResponseContainer
        color={EStyles.darkBlue}
        className="d-flex justify-center align-center"
      >
        {currentQuizItem?.choices[0] || "Erreur ! Le quiz n'a pas été trouvé."}
      </ResponseContainer>
      <ResponseContainer
        color={EStyles.yellow}
        className="d-flex justify-center align-center"
      >
        {currentQuizItem?.choices[1] || "Erreur ! Le quiz n'a pas été trouvé."}
      </ResponseContainer>
      <ResponseContainer
        color={EStyles.orange}
        className="d-flex justify-center align-center"
      >
        {currentQuizItem?.choices[2] || "Erreur ! Le quiz n'a pas été trouvé."}
      </ResponseContainer>
      <ResponseContainer
        color={EStyles.turquoise}
        className="d-flex justify-center align-center"
      >
        {currentQuizItem?.choices[3] || "Erreur ! Le quiz n'a pas été trouvé."}
      </ResponseContainer>
    </PlayerViewContainer>
  );
};

const QuizContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: ${EStyles.radius};
`;

const PlayerViewContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 10px;
`;

const ResponseContainer = styled.div.attrs((props: { color: string }) => ({
  color: props.color,
}))`
  width: calc(100% - 20px);
  height: 100%;
  margin: 10px;
  color: white;
  text-shadow: 2px 2px 0px ${EStyles.darkBlue};
  font-weight: bold;
  background-color: ${(props) => props.color};
  border-radius: ${EStyles.miniRadius};
`;

export default Quiz;
