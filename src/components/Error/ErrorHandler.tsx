import { ApolloError } from "@apollo/client";
import React from "react";
import FullScreenError from "components/Error/FullScreenError";

interface ErrorHandlerProps {
  gameError?: ApolloError | undefined;
  quizError?: ApolloError | undefined;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  gameError,
  quizError,
}): JSX.Element => {
  if (gameError) {
    return (
      <FullScreenError
        errorLabel="Erreur ! Partie non trouvée."
        link="/"
        linkLabel="Retourner au menu principal"
      />
    );
  }
  if (quizError) {
    return (
      <FullScreenError
        errorLabel="Erreur ! Quiz non trouvé."
        link="/"
        linkLabel="Retourner au menu principal"
      />
    );
  }

  return (
    <FullScreenError
      errorLabel="Erreur inconnue."
      linkLabel="Revenir au menu principal"
      link="/"
    />
  );
};

export default ErrorHandler;
