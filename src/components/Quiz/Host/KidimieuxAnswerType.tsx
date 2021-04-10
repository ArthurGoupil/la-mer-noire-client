import React from "react";
import styled from "styled-components";

import { getAnswerTypeColor } from "utils/quiz/getAnswerTypeColor.util";
import { AnswerType } from "constants/AnswerType.constants";
import { Styles } from "constants/Styling.constants";
import { Answer, Buzz, PlayerData } from "models/Game.model";
import { KidimieuxPoints } from "constants/Kidimieux.constants";
import { QuizLevel } from "models/Quiz.model";
import { useSound } from "hooks/others/useSound.hook";
import { HostSounds } from "constants/Sounds.constants";
import { Player } from "models/Player.model";

interface KidimieuxAnswerTypeProps {
  players: PlayerData[];
  quizLevel: QuizLevel;
  playersAnswers: Record<string, Answer>;
  playersBuzz: Record<string, Buzz>;
  playerMustAnswer: boolean;
  showInternalTimeBar: boolean;
  kidimieuxSoundCanPlay: boolean;
  shouldResetKidimieuxSounds: boolean;
}

export const KidimieuxAnswerType: React.FC<KidimieuxAnswerTypeProps> = ({
  players,
  quizLevel,
  playersAnswers,
  playersBuzz,
  playerMustAnswer,
  showInternalTimeBar,
  kidimieuxSoundCanPlay,
  shouldResetKidimieuxSounds,
}): JSX.Element => {
  const youAnswerRef = React.useRef<HTMLSpanElement>(null);
  const duoPlayerRef = React.useRef<HTMLSpanElement>(null);
  const carrePlayerRef = React.useRef<HTMLSpanElement>(null);
  const cashPlayerRef = React.useRef<HTMLSpanElement>(null);
  const { play: kidimieuxPlay } = useSound({ sound: HostSounds.kidimieuxHost });
  const [duoKidimieuxHasPlayed, setDuoKidimieuxHasPlayed] = React.useState<boolean>(false);
  const [carreKidimieuxHasPlayed, setCarreKidimieuxHasPlayed] = React.useState<boolean>(false);

  const playerNamesByAnswerType = Object.keys(playersBuzz).reduce(
    (playerNamesByAnswerType: Record<string, Player>, playerId: string) => {
      const player = players.find((playerData) => playerData.player._id === playerId)
        ?.player as Player;

      if (playersBuzz[playerId].answer === "duo") {
        playerNamesByAnswerType.duo = player;
      } else if (playersBuzz[playerId].answer === "carre") {
        playerNamesByAnswerType.carre = player;
      } else if (playersBuzz[playerId].answer === "cash") {
        playerNamesByAnswerType.cash = player;
      }

      return playerNamesByAnswerType;
    },
    {},
  );

  const duoAnswerTypeColor = playersAnswers[playerNamesByAnswerType?.duo?._id]
    ? playersAnswers[playerNamesByAnswerType?.duo?._id]?.isGoodAnswer
      ? Styles.good
      : Styles.wrong
    : getAnswerTypeColor({ answerType: AnswerType.duo });
  const carreAnswerTypeColor = playersAnswers[playerNamesByAnswerType?.carre?._id]
    ? playersAnswers[playerNamesByAnswerType?.carre?._id]?.isGoodAnswer
      ? Styles.good
      : Styles.wrong
    : getAnswerTypeColor({ answerType: AnswerType.carre });
  const cashAnswerTypeColor = playersAnswers[playerNamesByAnswerType?.cash?._id]
    ? playersAnswers[playerNamesByAnswerType?.cash?._id]?.isGoodAnswer
      ? Styles.good
      : Styles.wrong
    : getAnswerTypeColor({ answerType: AnswerType.cash });

  const duoCanAnswer =
    playerNamesByAnswerType.duo !== undefined &&
    playerNamesByAnswerType.carre === undefined &&
    playerNamesByAnswerType.cash === undefined;
  const duoWidth = playerMustAnswer
    ? duoCanAnswer
      ? "100%"
      : "0"
    : `calc(${100 / 3}% - ${20 / 3}px)`;
  const carreCanAnswer =
    playerNamesByAnswerType.carre !== undefined && playerNamesByAnswerType.cash === undefined;
  const carreWidth = playerMustAnswer
    ? carreCanAnswer
      ? "100%"
      : "0"
    : `calc(${100 / 3}% - ${20 / 3}px)`;
  const cashCanAnswer = playerNamesByAnswerType.cash !== undefined;
  const cashWidth = playerMustAnswer
    ? cashCanAnswer
      ? "100%"
      : "0"
    : `calc(${100 / 3}% - ${20 / 3}px)`;

  const showDuoKidimieux =
    playerNamesByAnswerType.duo !== undefined &&
    playerNamesByAnswerType.carre === undefined &&
    playerNamesByAnswerType.cash === undefined &&
    Object.keys(playersBuzz).length !== players.length &&
    !playerMustAnswer;
  const showCarreKidimieux =
    playerNamesByAnswerType.carre !== undefined &&
    playerNamesByAnswerType.cash === undefined &&
    Object.keys(playersBuzz).length !== players.length &&
    !playerMustAnswer;

  const duoPlayerNameContainerWidth =
    duoCanAnswer && playerMustAnswer
      ? (duoPlayerRef.current?.clientWidth || 0) + (youAnswerRef.current?.clientWidth || 0) + 10
      : duoPlayerRef.current?.clientWidth || 0;
  const carrePlayerNameContainerWidth =
    carreCanAnswer && playerMustAnswer
      ? (carrePlayerRef.current?.clientWidth || 0) + (youAnswerRef.current?.clientWidth || 0) + 10
      : carrePlayerRef.current?.clientWidth || 0;
  const cashPlayerNameContainerWidth =
    cashCanAnswer && playerMustAnswer
      ? (cashPlayerRef.current?.clientWidth || 0) + (youAnswerRef.current?.clientWidth || 0) + 10
      : cashPlayerRef.current?.clientWidth || 0;

  const isStuckToBottom = Object.keys(playersBuzz).length !== 0 && !playerMustAnswer;

  React.useEffect(() => {
    if (showDuoKidimieux && !duoKidimieuxHasPlayed && kidimieuxSoundCanPlay) {
      kidimieuxPlay();
      setDuoKidimieuxHasPlayed(true);
    }
  }, [duoKidimieuxHasPlayed, kidimieuxPlay, kidimieuxSoundCanPlay, showDuoKidimieux]);

  React.useEffect(() => {
    if (showCarreKidimieux && !carreKidimieuxHasPlayed && kidimieuxSoundCanPlay) {
      kidimieuxPlay();
      setCarreKidimieuxHasPlayed(true);
    }
  }, [carreKidimieuxHasPlayed, kidimieuxPlay, kidimieuxSoundCanPlay, showCarreKidimieux]);

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
            transform={playerNamesByAnswerType.duo !== undefined ? "scaleX(1)" : "scaleX(0)"}
            opacity={playerMustAnswer || Object.keys(playersBuzz).length === players.length ? 0 : 1}
          />
        )}
        <MalusPoints className="d-flex justify-center align-center">
          -{KidimieuxPoints[quizLevel].duo}
        </MalusPoints>
        <AnswerTypeTextContainer className="d-flex flex-column align-center justify-center">
          <AnswerTypeText marginBottom={playerNamesByAnswerType.duo !== undefined ? "70px" : "0"}>
            DUO
          </AnswerTypeText>
          <PlayerNameContainer
            width={duoPlayerNameContainerWidth}
            opacity={playerNamesByAnswerType.duo !== undefined ? 1 : 0}
            marginTop={playerNamesByAnswerType.duo !== undefined ? "50px" : "0"}
            className="d-flex"
          >
            <PlayerName ref={duoPlayerRef} color={duoAnswerTypeColor}>
              {playerNamesByAnswerType?.duo?.name.toUpperCase() || ""}
            </PlayerName>
            <YouAnswer ref={youAnswerRef}>À TOI DE RÉPONDRE !</YouAnswer>
          </PlayerNameContainer>
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
            transform={playerNamesByAnswerType.carre !== undefined ? "scaleX(1)" : "scaleX(0)"}
            opacity={playerMustAnswer || Object.keys(playersBuzz).length === players.length ? 0 : 1}
          />
        )}
        <MalusPoints className="d-flex justify-center align-center">
          -{KidimieuxPoints[quizLevel].carre}
        </MalusPoints>
        <AnswerTypeTextContainer className="d-flex flex-column align-center justify-center">
          <AnswerTypeText marginBottom={playerNamesByAnswerType.carre !== undefined ? "70px" : "0"}>
            CARRÉ
          </AnswerTypeText>
          <PlayerNameContainer
            width={carrePlayerNameContainerWidth}
            opacity={playerNamesByAnswerType.carre !== undefined ? 1 : 0}
            marginTop={playerNamesByAnswerType.carre !== undefined ? "50px" : "0"}
            className="d-flex"
          >
            <PlayerName ref={carrePlayerRef} color={carreAnswerTypeColor}>
              {playerNamesByAnswerType?.carre?.name.toUpperCase() || ""}
            </PlayerName>
            <YouAnswer>À TOI DE RÉPONDRE !</YouAnswer>
          </PlayerNameContainer>
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
          <AnswerTypeText marginBottom={playerNamesByAnswerType.cash !== undefined ? "70px" : "0"}>
            CASH
          </AnswerTypeText>
          {playerNamesByAnswerType.cash !== undefined && (
            <PlayerNameContainer
              width={cashPlayerNameContainerWidth}
              opacity={playerNamesByAnswerType.cash !== undefined ? 1 : 0}
              marginTop={playerNamesByAnswerType.cash !== undefined ? "50px" : "0"}
              className="d-flex"
            >
              <PlayerName ref={cashPlayerRef} color={cashAnswerTypeColor}>
                {playerNamesByAnswerType?.cash?.name.toUpperCase() || ""}
              </PlayerName>
              <YouAnswer>À TOI DE RÉPONDRE !</YouAnswer>
            </PlayerNameContainer>
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
  transition: width 0.5s, background-color 0.5s;
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

const PlayerNameContainer = styled.div<{ width: number; opacity: number; marginTop: string }>`
  max-width: 95%;
  width: ${(props) => props.width}px;
  z-index: 1;
  font-family: "Boogaloo", cursive;
  font-size: 20px;
  position: absolute;
  margin-top: ${(props) => props.marginTop};
  opacity: ${(props) => props.opacity};
  transition: margin-top 1s, opacity 1s, width 0.5s;
  overflow: hidden;
  padding: 10px 0;
  white-space: nowrap;
`;

const PlayerName = styled.span<{ color: string }>`
  background-color: ${Styles.darken_blue};
  text-shadow: 2px 2px 0px ${Styles.darkBlue};
  border-radius: 10px;
  padding: 10px 13px;
  color: ${(props) => props.color};
`;

const YouAnswer = styled.span`
  background-color: ${Styles.redOrange};
  text-shadow: 2px 2px 0px ${Styles.darkBlue};
  border-radius: 10px;
  padding: 10px 13px;
  margin-left: 10px;
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
