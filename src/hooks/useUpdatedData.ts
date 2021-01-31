import React from "react";
import { DocumentNode, useSubscription } from "@apollo/client";

import { ECookieName } from "constants/Cookies.constants";
import { setGameCookie } from "utils/cookies.utils";
import useGameCookie from "./useGameCookies";

interface UseUpdatedDataProps {
  shortId: string;
  subscription: DocumentNode;
  subscriptionName: string;
  subscriptionReturnVariable?: string;
  cookieName: ECookieName;
}

const useUpdatedData = <T>({
  shortId,
  subscription,
  subscriptionName,
  subscriptionReturnVariable,
  cookieName,
}: UseUpdatedDataProps): T => {
  const [updatedData, setUpdatedData] = React.useState<T>(
    useGameCookie<T>({
      prefix: shortId,
      cookieName,
    }),
  );
  const { data } = useSubscription(subscription, {
    variables: { shortId },
  });

  React.useEffect(() => {
    if (data) {
      const value = subscriptionReturnVariable
        ? data[subscriptionName][subscriptionReturnVariable]
        : data[subscriptionName];
      setUpdatedData(value);
      setGameCookie({
        prefix: shortId,
        cookieName,
        cookieValue: value,
      });
    }
  }, [data]);

  return updatedData;
};

export default useUpdatedData;
