import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

import { QuizItem } from "models/Quiz";
import EStyles from "constants/Styling.constants";
import { GIVE_ANSWER } from "services/games.service";

interface PlayerViewProps {
  shortId: string;
  playerId: string;
  currentQuizItem: QuizItem;
}

const PlayerView: React.FC<PlayerViewProps> = ({
  shortId,
  playerId,
  currentQuizItem,
}): JSX.Element => {
  const [giveAnswer] = useMutation(GIVE_ANSWER);

  return (
    <PlayerViewContainer className="d-flex flex-column">
      <ResponseContainer
        color={EStyles.darkBlue}
        className="d-flex justify-center align-center"
        onClick={async () => {
          await giveAnswer({
            variables: {
              shortId,
              playerId,
              answer: currentQuizItem?.choices[0],
            },
          });
        }}
      >
        {currentQuizItem?.choices[0]}
      </ResponseContainer>
      <ResponseContainer
        color={EStyles.yellow}
        className="d-flex justify-center align-center"
        onClick={async () =>
          await giveAnswer({
            variables: {
              shortId,
              playerId,
              answer: currentQuizItem?.choices[1],
            },
          })
        }
      >
        {currentQuizItem?.choices[1]}
      </ResponseContainer>
      <ResponseContainer
        color={EStyles.orange}
        className="d-flex justify-center align-center"
        onClick={async () =>
          await giveAnswer({
            variables: {
              shortId,
              playerId,
              answer: currentQuizItem?.choices[2],
            },
          })
        }
      >
        {currentQuizItem?.choices[2]}
      </ResponseContainer>
      <ResponseContainer
        color={EStyles.turquoise}
        className="d-flex justify-center align-center"
        onClick={async () =>
          await giveAnswer({
            variables: {
              shortId,
              playerId,
              answer: currentQuizItem?.choices[3],
            },
          })
        }
      >
        {currentQuizItem?.choices[3]}
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

const ResponseContainer = styled.button<{ color: string }>`
  width: calc(100% - 20px);
  height: 100%;
  margin: 10px;
  color: white;
  text-shadow: 2px 2px 0px ${EStyles.darkBlue};
  font-weight: bold;
  background-color: ${(props) => props.color};
  border-radius: ${EStyles.miniRadius};
  border: none;
`;

export default PlayerView;
