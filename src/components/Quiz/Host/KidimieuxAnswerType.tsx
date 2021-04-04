import React from "react";
import styled from "styled-components";

import { getAnswerTypeColor } from "utils/quiz/getAnswerTypeColor.util";
import { AnswerType } from "constants/AnswerType.constants";
import { Styles } from "constants/Styling.constants";
import { Buzz, PlayerData } from "models/Game.model";
import { KidimieuxPoints } from "constants/Kidimieux.constants";
import { QuizLevel } from "models/Quiz.model";
import { useSound } from "hooks/others/useSound.hook";
import { HostSounds } from "constants/Sounds.constants";

interface KidimieuxAnswerTypeProps {
  players: PlayerData[];
  quizLevel: QuizLevel;
  playersBuzz: Record<string, Buzz>;
  playerMustAnswer: boolean;
  showInternalTimeBar: boolean;
  shouldResetKidimieuxSounds: boolean;
}

export const KidimieuxAnswerType: React.FC<KidimieuxAnswerTypeProps> = ({
  players,
  quizLevel,
  playersBuzz,
  playerMustAnswer,
  showInternalTimeBar,
  shouldResetKidimieuxSounds,
}): JSX.Element => {
  const { play: kidimieuxPlay } = useSound({ sound: HostSounds.kidimieuxHost });
  const [duoKidimieuxHasPlayed, setDuoKidimieuxHasPlayed] = React.useState<boolean>(false);
  const [carreKidimieuxHasPlayed, setCarreKidimieuxHasPlayed] = React.useState<boolean>(false);

  const duoAnswerTypeColor = getAnswerTypeColor({ answerType: AnswerType.duo });
  const carreAnswerTypeColor = getAnswerTypeColor({ answerType: AnswerType.carre });
  const cashAnswerTypeColor = getAnswerTypeColor({ answerType: AnswerType.cash });

  const playerNamesByAnswerType = Object.keys(playersBuzz).reduce(
    (playerNamesByAnswerType: Record<string, string | undefined>, playerId: string) => {
      const playerName = players
        .find((playerData) => playerData.player._id === playerId)
        ?.player.name.toUpperCase();
      if (playersBuzz[playerId].answer === "duo") {
        playerNamesByAnswerType.duo = playerName;
      } else if (playersBuzz[playerId].answer === "carre") {
        playerNamesByAnswerType.carre = playerName;
      } else if (playersBuzz[playerId].answer === "cash") {
        playerNamesByAnswerType.cash = playerName;
      }

      return playerNamesByAnswerType;
    },
    { duo: undefined, carre: undefined, cash: undefined },
  );

  const duoCanAnswer =
    playerNamesByAnswerType.duo && !playerNamesByAnswerType.carre && !playerNamesByAnswerType.cash;
  const duoWidth = playerMustAnswer
    ? duoCanAnswer
      ? "100%"
      : "0"
    : `calc(${100 / 3}% - ${20 / 3}px)`;
  const carreCanAnswer = playerNamesByAnswerType.carre && !playerNamesByAnswerType.cash;
  const carreWidth = playerMustAnswer
    ? carreCanAnswer
      ? "100%"
      : "0"
    : `calc(${100 / 3}% - ${20 / 3}px)`;
  const cashCanAnswer = playerNamesByAnswerType.cash;
  const cashWidth = playerMustAnswer
    ? cashCanAnswer
      ? "100%"
      : "0"
    : `calc(${100 / 3}% - ${20 / 3}px)`;

  const showDuoKidimieux =
    playerNamesByAnswerType.duo &&
    !playerNamesByAnswerType.carre &&
    !playerNamesByAnswerType.cash &&
    Object.keys(playersBuzz).length !== players.length &&
    !playerMustAnswer;

  const showCarreKidimieux =
    playerNamesByAnswerType.carre &&
    !playerNamesByAnswerType.cash &&
    Object.keys(playersBuzz).length !== players.length &&
    !playerMustAnswer;

  const isStuckToBottom = Object.keys(playersBuzz).length !== 0 && !playerMustAnswer;

  React.useEffect(() => {
    if (showDuoKidimieux && !duoKidimieuxHasPlayed) {
      kidimieuxPlay();
      setDuoKidimieuxHasPlayed(true);
    }
  }, [duoKidimieuxHasPlayed, kidimieuxPlay, showDuoKidimieux]);

  React.useEffect(() => {
    if (showCarreKidimieux && !carreKidimieuxHasPlayed) {
      kidimieuxPlay();
      setCarreKidimieuxHasPlayed(true);
    }
  }, [carreKidimieuxHasPlayed, kidimieuxPlay, showCarreKidimieux]);

  React.useEffect(() => {
    if (shouldResetKidimieuxSounds) {
      setDuoKidimieuxHasPlayed(false);
      setCarreKidimieuxHasPlayed(false);
    }
  }, [shouldResetKidimieuxSounds]);

  return (
    <KidimieuxAnswerTypeContainer
      transform={isStuckToBottom ? "translateY(70px)" : "translateY(0px)"}
      className="d-flex space-between"
    >
      <AnswerTypeContainer
        width={duoWidth}
        backgroundColor={duoAnswerTypeColor}
        className="d-flex space-around align-center"
      >
        {showInternalTimeBar && (
          <InternalTimeBar
            transform={playerNamesByAnswerType.duo ? "scaleX(1)" : "scaleX(0)"}
            opacity={playerMustAnswer || Object.keys(playersBuzz).length === players.length ? 0 : 1}
          />
        )}
        <MalusPoints className="d-flex justify-center align-center">
          -{KidimieuxPoints[quizLevel].duo}
        </MalusPoints>
        <AnswerTypeTextContainer className="d-flex flex-column align-center justify-center">
          <AnswerTypeText marginBottom={playerNamesByAnswerType.duo ? "70px" : "0"}>
            DUO
          </AnswerTypeText>
          <PlayerName
            opacity={playerNamesByAnswerType.duo ? 1 : 0}
            marginTop={playerNamesByAnswerType.duo ? "50px" : "0"}
            color={duoAnswerTypeColor}
          >
            {playerNamesByAnswerType.duo || ""}
          </PlayerName>
        </AnswerTypeTextContainer>
        <BonusPoints color={duoAnswerTypeColor} className="d-flex justify-center align-center">
          <Plus>+</Plus>
          {KidimieuxPoints[quizLevel].duo}
        </BonusPoints>
        <KidimieuxContainer
          scaleX={showDuoKidimieux ? "scaleX(1)" : "scaleX(0)"}
          className="d-flex justify-center align-center"
        >
          KIDIMIEUX ?
        </KidimieuxContainer>
      </AnswerTypeContainer>
      <AnswerTypeContainer
        width={carreWidth}
        backgroundColor={carreAnswerTypeColor}
        className="d-flex justify-center align-center"
      >
        {showInternalTimeBar && (
          <InternalTimeBar
            transform={playerNamesByAnswerType.carre ? "scaleX(1)" : "scaleX(0)"}
            opacity={playerMustAnswer || Object.keys(playersBuzz).length === players.length ? 0 : 1}
          />
        )}
        <MalusPoints className="d-flex justify-center align-center">
          -{KidimieuxPoints[quizLevel].carre}
        </MalusPoints>
        <AnswerTypeTextContainer className="d-flex flex-column align-center justify-center">
          <AnswerTypeText marginBottom={playerNamesByAnswerType.carre ? "70px" : "0"}>
            CARRÉ
          </AnswerTypeText>
          <PlayerName
            opacity={playerNamesByAnswerType.carre ? 1 : 0}
            marginTop={playerNamesByAnswerType.carre ? "50px" : "0"}
            color={carreAnswerTypeColor}
          >
            {playerNamesByAnswerType.carre || ""}
          </PlayerName>
        </AnswerTypeTextContainer>
        <BonusPoints color={carreAnswerTypeColor} className="d-flex justify-center align-center">
          <Plus>+</Plus>
          {KidimieuxPoints[quizLevel].carre}
        </BonusPoints>
        <KidimieuxContainer
          scaleX={showCarreKidimieux ? "scaleX(1)" : "scaleX(0)"}
          className="d-flex justify-center align-center"
        >
          KIDIMIEUX ?
        </KidimieuxContainer>
      </AnswerTypeContainer>
      <AnswerTypeContainer
        width={cashWidth}
        backgroundColor={cashAnswerTypeColor}
        className="d-flex justify-center align-center"
      >
        <MalusPoints className="d-flex justify-center align-center">
          -{KidimieuxPoints[quizLevel].cash}
        </MalusPoints>
        <AnswerTypeTextContainer className="d-flex flex-column align-center justify-center">
          <AnswerTypeText marginBottom={playerNamesByAnswerType.cash ? "70px" : "0"}>
            CASH
          </AnswerTypeText>
          {playerNamesByAnswerType.cash && (
            <PlayerName
              opacity={playerNamesByAnswerType.cash ? 1 : 0}
              marginTop={playerNamesByAnswerType.cash ? "50px" : "0"}
              color={cashAnswerTypeColor}
            >
              {playerNamesByAnswerType.cash || ""}
            </PlayerName>
          )}
        </AnswerTypeTextContainer>
        <BonusPoints color={cashAnswerTypeColor} className="d-flex justify-center align-center">
          <Plus>+</Plus>
          {KidimieuxPoints[quizLevel].cash}
        </BonusPoints>
      </AnswerTypeContainer>
    </KidimieuxAnswerTypeContainer>
  );
};

const KidimieuxAnswerTypeContainer = styled.div<{ transform: string }>`
  width: 100%;
  height: 170px;
  margin-bottom: 10px;
  background-color: ${Styles.darkBlue};
  padding: 10px;
  border-radius: 5px;
  transform: ${(props) => props.transform};
  transition: transform 0.5s;
`;

const AnswerTypeContainer = styled.div<{ width: string; backgroundColor: string }>`
  width: ${(props) => props.width};
  height: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor};
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  position: relative;
  right: 0;
  overflow: hidden;
  transition: width 0.5s;
`;

const MalusPoints = styled.div`
  width: 53px;
  height: 53px;
  background-color: ${Styles.wrong};
  position: absolute;
  left: 20px;
  top: 20px;
  border-radius: 30px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  color: ${Styles.darkBlue};
`;

const Plus = styled.span`
  font-size: 20px;
  line-height: 30px;
`;

const BonusPoints = styled.div`
  width: 53px;
  height: 53px;
  background-color: ${Styles.good};
  position: absolute;
  right: 20px;
  top: 20px;
  border-radius: 30px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  color: ${Styles.darkBlue};
`;

const InternalTimeBar = styled.div<{ transform: string; opacity: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 0;
  transform: ${(props) => props.transform};
  opacity: ${(props) => props.opacity};
  transition: transform 5s 1s linear, opacity 0.5s;
  transform-origin: left;
`;

const AnswerTypeTextContainer = styled.div`
  width: 100%;
  position: relative;
`;

const AnswerTypeText = styled.div<{ marginBottom: string }>`
  z-index: 2;
  position: absolute;
  margin-bottom: ${(props) => props.marginBottom};
  padding: 15px;
  transition: margin-bottom 1s;
  text-shadow: 3px 3px 0px ${Styles.darkBlue};
  transform: none;
`;

const PlayerName = styled.div<{ opacity: number; marginTop: string; color: string }>`
  max-width: 95%;
  z-index: 1;
  font-family: "Boogaloo", cursive;
  font-size: 20px;
  color: ${(props) => props.color};
  background-color: ${Styles.darken_blue};
  padding: 10px 13px;
  text-shadow: 2px 2px 0px ${Styles.darkBlue};
  border-radius: 10px;
  position: absolute;
  margin-top: ${(props) => props.marginTop};
  opacity: ${(props) => props.opacity};
  transition: margin-top 1s, opacity 1s;
  overflow: hidden;
`;

const KidimieuxContainer = styled.div<{ scaleX: string }>`
  width: 250px;
  height: 50px;
  position: absolute;
  top: 40px;
  right: -60px;
  background-color: ${Styles.redOrange};
  transform: rotate(45deg) ${(props) => props.scaleX};
  transition: transform 0.3s 1s linear;
  text-shadow: 3px 3px 0px ${Styles.darkBlue};
  z-index: 2;
`;
