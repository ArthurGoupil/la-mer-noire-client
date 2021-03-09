import React from "react";
import styled from "styled-components";
import NoSleep from "nosleep.js";

import { Link, useHistory } from "react-router-dom";
import { FullHeightLayout } from "components/Utils/FullHeightLayout";
import { LMNLogo } from "components/Utils/LMNLogo";
import { InputAndButton } from "components/Utils/InputAndButton";
import { AnimatedSubmarine } from "components/Utils/AnimatedSubmarine";
import { useLazyQuery } from "@apollo/client";
import { GET_GAME } from "services/games.service";
import { ErrorMessage } from "components/Utils/ErrorMessage";
import { useSound } from "hooks/others/useSound.hook";
import { ESounds } from "constants/Sounds.constants";
import { isDesktop } from "utils/isDesktop.util";

export const HomeContainer: React.FC = (): JSX.Element => {
  const history = useHistory();
  const [triggerGetGame, { data, loading, error, called }] = useLazyQuery(GET_GAME);
  const noSleep = new NoSleep();
  useSound({
    sound: ESounds.homeWater,
    autoplay: true,
    loop: true,
    condition: isDesktop(),
    fadeOut: true,
  });

  React.useEffect(() => {
    if (data && !error) {
      history.push(`/games/${data.game.shortId}/join`);
    }
  }, [data, error, history]);

  return (
    <FullHeightLayout className="d-flex flex-column align-center justify-center">
      <LMNLogo width="500px" margin={`0 0 20px 0`} />
      <InputAndButton
        handleSubmit={(value) => {
          triggerGetGame({ variables: { shortId: value } });
          noSleep.enable();
        }}
        buttonLabel="Rejoindre la partie"
        inputWidth={130}
        margin={`0 0 15px 0`}
        placeholder="52E5E"
        isLoading={loading}
      />
      <CreateGameWrapper>
        <Link to="/create">Créer une partie</Link>
      </CreateGameWrapper>
      <ErrorMessage
        errorMessage="Impossible de rejoindre la partie. Vérifiez le code et réessayez."
        isDisplayed={called && !loading && !data}
        margin="15px 0 0 0"
      />
      <AnimatedSubmarine />
    </FullHeightLayout>
  );
};

const CreateGameWrapper = styled.div`
  font-size: 14px;
  line-height: 14px;
`;
