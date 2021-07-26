import { NetworkStatus } from "@apollo/client";

interface GetGlobalNetworkStatusProps {
  networkStatuses: NetworkStatus[];
  booleanCondition?: boolean;
}

export type NS = "ready" | "loading" | "error";

export const getNS = (networkStatus: NetworkStatus): NS => {
  switch (networkStatus) {
    case 1:
      return "loading";
    case 2:
      return "ready";
    case 3:
      return "loading";
    case 4:
      return "loading";
    case 6:
      return "loading";
    case 7:
      return "ready";
    case 8:
      return "error";
    default:
      return "loading";
  }
};

export const getGlobalNetworkStatus = ({
  networkStatuses,
  booleanCondition = true,
}: GetGlobalNetworkStatusProps): NS => {
  let mergedNetworkStatus: NS = "ready";

  for (let i = 0; i < networkStatuses.length; i++) {
    if (getNS(networkStatuses[i]) === "error") {
      mergedNetworkStatus = "error";
      break;
    } else if (getNS(networkStatuses[i]) === "loading") {
      mergedNetworkStatus = "loading";
    }
  }

  if (!booleanCondition && mergedNetworkStatus !== "error") {
    return "loading";
  }

  return mergedNetworkStatus;
};
