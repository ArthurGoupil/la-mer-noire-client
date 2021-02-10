import { useQuery } from "@apollo/client";
import { GET_TIMESTAMP } from "services/others.service";

interface UseQuizRemainingTimeProps {
  timestampReference: number;
  duration: number;
}

const useQuizRemainingTime = ({
  timestampReference,
  duration,
}: UseQuizRemainingTimeProps): number => {
  const { data } = useQuery(GET_TIMESTAMP);

  return timestampReference + duration - data?.timestamp;
};

export default useQuizRemainingTime;
