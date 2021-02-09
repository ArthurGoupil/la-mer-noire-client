interface GetQuizRemainingTimeProps {
  timestampReference: number;
  duration: number;
}

const getQuizRemainingTime = ({
  timestampReference,
  duration,
}: GetQuizRemainingTimeProps): number => {
  const currentTime = Math.floor(Date.now() / 1000);
  return timestampReference + duration - currentTime;
};

export default getQuizRemainingTime;
