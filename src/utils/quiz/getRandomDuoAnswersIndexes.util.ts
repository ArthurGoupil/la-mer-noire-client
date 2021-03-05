interface GetRandomDuoAnswers {
  choices: string[];
  answer: string;
}

export const getRandomDuoAnswersIndexes = ({ choices, answer }: GetRandomDuoAnswers): number[] => {
  const duoAnswersIndexes = [];

  const indexes = [0, 1, 2, 3];
  const answerIndex = choices.indexOf(answer);
  indexes.splice(answerIndex, 1);
  const wrongAnswerIndex = indexes[Math.floor(Math.random() * 3)];

  const zeroOrOne = Math.floor(Math.random() * 2);

  if (zeroOrOne === 0) {
    duoAnswersIndexes.push(answerIndex);
    duoAnswersIndexes.push(wrongAnswerIndex);
  } else {
    duoAnswersIndexes.push(wrongAnswerIndex);
    duoAnswersIndexes.push(answerIndex);
  }

  return duoAnswersIndexes;
};
