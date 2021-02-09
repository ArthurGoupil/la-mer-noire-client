interface UseRemainingTimeProps {
  timestampReference: number;
  duration: number;
}

const useRemainingTime = ({
  timestampReference,
  duration,
}: UseRemainingTimeProps): number => {
  const currentTime = Math.floor(Date.now() / 1000);
  return timestampReference + duration - currentTime;
};

export default useRemainingTime;
