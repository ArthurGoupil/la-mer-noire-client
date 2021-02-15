import { NetworkStatus } from "@apollo/client";
import { error, loading, ready } from "constants/NetworkStatuses.constants";

interface GetGlobalNetworkStatusProps {
  networkStatuses: NetworkStatus[];
  booleanCondition?: boolean;
}

export const getNetworkStatus = (
  networkStatus: NetworkStatus,
): NetworkStatus => {
  switch (networkStatus) {
    case 1:
      return loading;
    case 2:
      return loading;
    case 3:
      return loading;
    case 4:
      return loading;
    case 6:
      return loading;
    case 7:
      return ready;
    case 8:
      return error;
    default:
      return loading;
  }
};

export const getGlobalNetworkStatus = ({
  networkStatuses,
  booleanCondition = true,
}: GetGlobalNetworkStatusProps): NetworkStatus => {
  let mergedNetworkStatus: number = ready;

  for (let i = 0; i < networkStatuses.length; i++) {
    if (getNetworkStatus(networkStatuses[i]) === error) {
      mergedNetworkStatus = error;
      break;
    } else if (getNetworkStatus(networkStatuses[i]) === loading) {
      mergedNetworkStatus = loading;
    }
  }

  if (!booleanCondition && mergedNetworkStatus !== error) {
    return loading;
  }

  return mergedNetworkStatus;
};
