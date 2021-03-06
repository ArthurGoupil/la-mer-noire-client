import React from "react";
import styled from "styled-components";

import { FullWidthContainer } from "components/Utils/FullWidthContainer";
import { LMNLogo } from "components/Utils/LMNLogo";
import { GameName } from "./GameName";
import { StageNameMini } from "./StageNameMini";
import { GameStage } from "constants/GameStage.constants";
import { useWindowHeight } from "hooks/others/useWindowHeight.hook";
import { Styles } from "constants/Styling.constants";
import { FullHeightWithWaves } from "./FullHeightWithWaves";

interface QuizLayoutProps {
  gameName: string;
  stage: GameStage;
  topScreens: TopScreen[];
  showTopScreen: boolean;
  children: React.ReactNode;
}

interface TopScreen {
  component: React.ReactNode;
  shouldEnter: boolean;
  shouldLeave: boolean;
  wavesBackgroundGradient?: string[];
}

interface GetWavesBackgroundGradientProps {
  topScreens: TopScreen[];
}

export const QuizLayout: React.FC<QuizLayoutProps> = ({
  children,
  gameName,
  stage,
  topScreens,
  showTopScreen,
}): JSX.Element => {
  const { height: minHeight } = useWindowHeight();
  const quizLayoutRef = React.useRef<HTMLDivElement>(null);
  const height = quizLayoutRef.current?.clientHeight || 0;

  const getWavesBackgroundGradient = ({ topScreens }: GetWavesBackgroundGradientProps) => {
    for (const topScreen of topScreens) {
      if (topScreen.shouldEnter) {
        return topScreen.wavesBackgroundGradient;
      }
    }
  };

  const [displayTopScreen, setDisplayTopScreen] = React.useState<boolean[]>(
    topScreens.map(() => false),
  );

  React.useEffect(() => {
    const newDisplayTopScreen = topScreens.map(
      (topScreen) => topScreen.shouldEnter || topScreen.shouldLeave,
    );
    setDisplayTopScreen(newDisplayTopScreen);
  }, [topScreens]);

  return (
    <ScreensWrapper height={height} minHeight={minHeight}>
      <ScreensContainer translateY={showTopScreen ? "translateY(100%)" : "translateY(0%)"}>
        <QuizLayoutContainer minHeight={minHeight} className="d-flex flex-column align-center">
          <FullHeightWithWaves
            wavesBackgroundGradient={getWavesBackgroundGradient({ topScreens })}
            containerDisplay={displayTopScreen ? "block" : "none"}
            top="-100%"
          >
            {topScreens.map((topScreen, index) => {
              const { shouldEnter, shouldLeave, component } = topScreen;
              const translateX =
                !shouldEnter && !shouldLeave
                  ? "translateX(-100%)"
                  : shouldEnter
                  ? "translateX(0)"
                  : "translate(100%)";

              return (
                <TopScreen
                  key={index}
                  opacity={displayTopScreen[index] ? 1 : 0}
                  translateX={translateX}
                  className="d-flex justify-center align-center"
                >
                  {component}
                </TopScreen>
              );
            })}
          </FullHeightWithWaves>
          <ChildrenContainer
            ref={quizLayoutRef}
            className="d-flex flex-column align-center flex-grow"
          >
            <FullWidthContainer className="d-flex space-between" margin="0 0 30px 0">
              <LMNLogo width="220px" margin={`0 0 30px 0`} />
              <GameName gameName={gameName} />
              <EmptyDivForFullScreenIcon />
            </FullWidthContainer>
            <StageNameMini stage={stage} />
            {children}
          </ChildrenContainer>
        </QuizLayoutContainer>
      </ScreensContainer>
    </ScreensWrapper>
  );
};

const ScreensWrapper = styled.div<{ height: number; minHeight: number }>`
  width: 100vw;
  height: ${(props) => props.height}px;
  min-height: ${(props) => props.minHeight}px;
  overflow: hidden;
`;

const ScreensContainer = styled.div<{ translateY: string }>`
  width: 100%;
  height: 100%;
  transform: ${(props) => props.translateY};
  transition: transform 1.5s;
`;

const QuizLayoutContainer = styled.div<{ minHeight: number }>`
  width: 100%;
  height: 100%;
  min-height: ${(props) => props.minHeight}px;
  padding: 40px;
  background: linear-gradient(to bottom, ${Styles.blue}, ${Styles.darkBlue});
  position: relative;
`;

const TopScreen = styled.div<{ opacity: number; translateX: string }>`
  width: 100%;
  height: 100%;
  transform: ${(props) => props.translateX};
  transition: transform 1s;
  position: absolute;
  opacity: ${(props) => props.opacity};
`;

const EmptyDivForFullScreenIcon = styled.div`
  width: 220px;
`;

const ChildrenContainer = styled.div`
  width: 100%;
`;
