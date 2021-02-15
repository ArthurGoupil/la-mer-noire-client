interface GetLettersRecordFromString {
  word: string;
  returnsEmptyString: boolean;
}

export const getLettersRecordFromString = ({
  word,
  returnsEmptyString,
}: GetLettersRecordFromString): Record<number, string> => {
  let lettersRecord: Record<string, string> = {};
  word
    .replace(/\s/g, "")
    .split("")
    .forEach((letter: string, index: number) => {
      lettersRecord[index] = returnsEmptyString ? "" : letter;
    });

  return lettersRecord;
};
