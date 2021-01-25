import React from "react";
import styled from "styled-components";

import LMNLogo from "components/Utils/LMNLogo";
import FullContainer from "components/Utils/FullContainer";
import EStyles from "constants/Styling.constants";
import { QuizItem } from "models/Quiz";

interface HostViewProps {
  currentQuizItem: QuizItem;
}

const HostView: React.FC<HostViewProps> = ({
  currentQuizItem,
}): JSX.Element => {
  return (
    <FullContainer className="d-flex flex-column align-center space-around">
      <LMNLogo width="400px" margin={`20px 0 20px 0`} />
      <QuizContainer>{currentQuizItem.question}</QuizContainer>
    </FullContainer>
  );
};

const QuizContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: ${EStyles.radius};
`;

export default HostView;
