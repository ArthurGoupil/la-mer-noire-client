interface GetRandomDuoAnswers {
  choices: string[];
  answer: string;
}

export const getRandomDuoAnswersIndexes = ({
  choices,
  answer,
}: GetRandomDuoAnswers) => {
  const duoAnswers = [];

  const indexes = [0, 1, 2, 3];
  const answerIndex = choices.indexOf(answer);
  indexes.splice(answerIndex, 1);
  const wrongAnswerIndex = indexes[Math.floor(Math.random() * 3)];

  const zeroOrOne = Math.floor(Math.random() * 2);

  if (zeroOrOne === 0) {
    duoAnswers.push(answerIndex);
    duoAnswers.push(wrongAnswerIndex);
  } else {
    duoAnswers.push(wrongAnswerIndex);
    duoAnswers.push(answerIndex);
  }

  return duoAnswers;
};
