interface GetLettersRecordFromString {
  word: string;
  isEmptyString: boolean;
}

const getLettersRecordFromString = ({
  word,
  isEmptyString,
}: GetLettersRecordFromString): Record<number, string> => {
  let lettersRecord: Record<string, string> = {};
  word
    .replace(/\s/g, "")
    .split("")
    .forEach((letter: string, index: number) => {
      lettersRecord[index] = isEmptyString ? "" : letter;
    });

  return lettersRecord;
};

export default getLettersRecordFromString;
