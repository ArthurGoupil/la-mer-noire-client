import React from "react";
import styled from "styled-components";
import { useSubscription } from "@apollo/client";

import LMNLogo from "components/Utils/LMNLogo";
import FullContainer from "components/Utils/FullContainer";
import EStyles from "constants/Styling.constants";
import { QuizItem } from "models/Quiz";
import { PLAYER_ANSWERED_SUBSCRIPTION } from "services/games.service";
import { Player } from "models/Player";

interface HostViewProps {
  shortId: string;
  currentQuizItem: QuizItem;
  currentPlayers: Player[];
}

const HostView: React.FC<HostViewProps> = ({
  shortId,
  currentQuizItem,
  currentPlayers,
}): JSX.Element => {
  const { data, loading } = useSubscription(PLAYER_ANSWERED_SUBSCRIPTION, {
    variables: { shortId },
  });

  console.log(
    `${
      currentPlayers.find(
        (player) => player._id === data?.playerAnswered?.playerId,
      )?.name
    } a répondu ${data?.playerAnswered?.answer}`,
  );

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
