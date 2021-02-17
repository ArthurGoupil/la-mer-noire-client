interface GetLevelByQuestionNumberProps {
  questionNumber: StringQuestionNumber;
}

export type StringQuestionNumber =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";
type IntQuestionNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const getLevelByQuestionNumber = ({
  questionNumber,
}: GetLevelByQuestionNumberProps) => {
  const intQuestionNumber: IntQuestionNumber = parseInt(
    questionNumber,
  ) as IntQuestionNumber;

  return {
    1: "beginner",
    2: "beginner",
    3: "beginner",
    4: "intermediate",
    5: "intermediate",
    6: "intermediate",
    7: "expert",
    8: "expert",
    9: "expert",
  }[intQuestionNumber];
};
