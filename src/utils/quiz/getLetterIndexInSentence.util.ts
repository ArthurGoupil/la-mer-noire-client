interface GetLetterIndexInSentenceProps {
  sentence: string[];
  wordIndex: number;
  letterIndex: number;
}

export const getLetterIndexInSentence = ({
  sentence,
  wordIndex,
  letterIndex,
}: GetLetterIndexInSentenceProps): number => {
  let letterIndexInSentence = 0;
  for (let i = 0; i <= wordIndex; i++) {
    if (i === wordIndex) {
      letterIndexInSentence += letterIndex;
    } else {
      letterIndexInSentence += sentence[i].length;
    }
  }
  return letterIndexInSentence;
};
