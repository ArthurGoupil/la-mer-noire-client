import React from "react";
import styled from "styled-components";

import { QuizItem } from "models/Quiz";
import EStyles from "constants/Styling.constants";

interface PlayerViewProps {
  currentQuizItem: QuizItem;
}

const PlayerView: React.FC<PlayerViewProps> = ({
  currentQuizItem,
}): JSX.Element => {
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

const PlayerViewContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 10px;
`;

const ResponseContainer = styled.div<{ color: string }>`
  width: calc(100% - 20px);
  height: 100%;
  margin: 10px;
  color: white;
  text-shadow: 2px 2px 0px ${EStyles.darkBlue};
  font-weight: bold;
  background-color: ${(props) => props.color};
  border-radius: ${EStyles.miniRadius};
`;

export default PlayerView;
