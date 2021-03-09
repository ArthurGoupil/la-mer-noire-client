import React from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import NoSleep from "nosleep.js";

import { InputAndButton } from "components/Utils/InputAndButton";
import { FullHeightLayout } from "components/Utils/FullHeightLayout";
import { LMNLogo } from "components/Utils/LMNLogo";
import { CREATE_GAME } from "services/games.service";
import { AnimatedSubmarine } from "components/Utils/AnimatedSubmarine";
import { resetCookies } from "utils/cookies.util";
import { useSound } from "hooks/others/useSound.hook";
import { isDesktop } from "utils/isDesktop.util";
import { ESounds } from "constants/Sounds.constants";

interface HandleSubmitProps {
  name: string;
}

export const CreateGameContainer: React.FC = (): JSX.Element => {
  const history = useHistory();
  const noSleep = new NoSleep();
  const [createGame, { loading }] = useMutation(CREATE_GAME);
  useSound({ sound: ESounds.HomeWater, condition: isDesktop(), loop: true, fadeOut: true });

  const handleSubmit = async ({ name }: HandleSubmitProps) => {
    resetCookies();
    const createdGame = (await createGame({ variables: { name } })).data.createGame;
    history.push(`/games/${createdGame.shortId}/host`);
  };

  return (
    <FullHeightLayout className="d-flex flex-column align-center justify-center">
      <LMNLogo width="500px" margin={`0 0 20px 0`} />
      <InputAndButton
        handleSubmit={async (value) => {
          await handleSubmit({ name: value });
          noSleep.enable();
        }}
        buttonLabel="Créer la partie"
        valueMaxLength={40}
        isLoading={loading}
        placeholder="Nom de la partie"
      />
      <AnimatedSubmarine />
    </FullHeightLayout>
  );
};
