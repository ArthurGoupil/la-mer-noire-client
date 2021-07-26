import { Answer, Buzz, KidimieuxMaster, QuestionRecord } from "models/Game.model";

interface GetKidimieuxMasterInterpretationProps {
  kidimieuxMaster: KidimieuxMaster;
  playersCanBuzz: boolean;
  playersCanAnswer: boolean;
  questionRecord: QuestionRecord;
  playersBuzz: Record<string, Buzz>;
  playersAnswers: Record<string, Answer>;
}

interface GetKidimieuxMasterInterpretationReturn {
  stageNameEnter: boolean;
  stageNameCanPlay: boolean;
  stageNameLeave: boolean;

  quizItemInfosEnter: boolean;
  showThemeSubTheme: boolean;

  fetchQuizItemData: boolean;
  shouldResetKidimieuxSounds: boolean;

  playerMustAnswer: boolean;
  kidimieuxSoundCanPlay: boolean;
  showInternalTimeBar: boolean;

  displayTimeBar: boolean;
  timeBarTimestamp: number | null;
  timeBarIsOver: boolean;
  timeBarShouldAnimateToEnd: boolean;
  timeBarSoundShouldStop: boolean;

  questionSummaryEnter: boolean;
  questionSummaryLeave: boolean;
  showDeltaPoints: boolean;

  showPreviousRanking: boolean;
  playersRankingEnter: boolean;
  playersRankingLeave: boolean;
}

export const getKidimieuxMasterInterpretation = ({
  kidimieuxMaster,
  playersCanBuzz,
  playersCanAnswer,
  questionRecord,
  playersBuzz,
  playersAnswers,
}: GetKidimieuxMasterInterpretationProps): GetKidimieuxMasterInterpretationReturn => {
  return {
    stageNameEnter: kidimieuxMaster.state.includes("stageName"),
    stageNameCanPlay: kidimieuxMaster.state === "stageName",
    stageNameLeave:
      kidimieuxMaster.state.includes("quizItemInfos") && kidimieuxMaster.questionNumber === 1,

    quizItemInfosEnter:
      kidimieuxMaster.state.includes("quizItemInfos") ||
      kidimieuxMaster.state === "buzz" ||
      kidimieuxMaster.state === "buzz_fetchTimestamp" ||
      kidimieuxMaster.state === "buzz_screensTransitionSound",
    showThemeSubTheme:
      kidimieuxMaster.state === "quizItemInfos_showThemeSubTheme" ||
      kidimieuxMaster.state === "buzz" ||
      kidimieuxMaster.state === "buzz_fetchTimestamp" ||
      kidimieuxMaster.state === "buzz_screensTransitionSound",

    fetchQuizItemData: kidimieuxMaster.state === "quizItemInfos_fetchQuizItemData",
    shouldResetKidimieuxSounds: kidimieuxMaster.state === "buzz_fetchTimestamp",

    playerMustAnswer:
      Object.keys(playersAnswers).length > 0 ||
      (Object.keys(playersBuzz).length > 0 && !playersCanBuzz)
        ? kidimieuxMaster.state.includes("question") ||
          kidimieuxMaster.state.includes("questionSummary") ||
          kidimieuxMaster.state === "questionIsTimedOut"
        : kidimieuxMaster.state.includes("question") &&
          !kidimieuxMaster.state.includes("questionSummary") &&
          kidimieuxMaster.state !== "questionIsTimedOut",
    kidimieuxSoundCanPlay:
      kidimieuxMaster.state === "buzz_duo" || kidimieuxMaster.state === "buzz_carre",
    showInternalTimeBar:
      kidimieuxMaster.state.includes("buzz") || kidimieuxMaster.state.includes("question"),

    displayTimeBar:
      kidimieuxMaster.state.includes("buzz") ||
      (kidimieuxMaster.state.includes("question") &&
        kidimieuxMaster.state !== "question_playerMustAnswer_fetchTimestamp" &&
        playersCanAnswer) ||
      kidimieuxMaster.state === "questionIsTimedOut" ||
      kidimieuxMaster.state === "questionMustTimeout" ||
      kidimieuxMaster.state.includes("questionSummary"),
    timeBarTimestamp:
      kidimieuxMaster.state.includes("buzz") ||
      (kidimieuxMaster.state.includes("question") && Object.keys(playersBuzz).length === 0)
        ? questionRecord?.buzzTimestamp
        : kidimieuxMaster.state.includes("question") &&
          kidimieuxMaster.state !== "question_playerMustAnswer_fetchTimestamp"
        ? questionRecord?.timestamp
        : null,
    timeBarShouldAnimateToEnd:
      kidimieuxMaster.state === "buzz_duo" ||
      kidimieuxMaster.state === "buzz_carre" ||
      kidimieuxMaster.state === "question_playerMustAnswer_fetchTimestamp" ||
      kidimieuxMaster.state === "questionMustTimeout",
    timeBarIsOver: kidimieuxMaster.state.includes("buzz")
      ? questionRecord?.buzzIsDone
      : kidimieuxMaster.state.includes("question") &&
        kidimieuxMaster.state !== "question_playerMustAnswer_fetchTimestamp"
      ? questionRecord?.isDone
      : false,
    timeBarSoundShouldStop:
      kidimieuxMaster.state === "buzz_duo" ||
      kidimieuxMaster.state === "buzz_carre" ||
      kidimieuxMaster.state === "question_playerMustAnswer_fetchTimestamp" ||
      kidimieuxMaster.state === "questionMustTimeout",

    questionSummaryEnter: kidimieuxMaster.state.includes("questionSummary"),
    questionSummaryLeave: kidimieuxMaster.state.includes("playersRanking"),
    showDeltaPoints: kidimieuxMaster.state === "questionSummary_points",

    showPreviousRanking:
      kidimieuxMaster.state === "playersRanking_previous" ||
      kidimieuxMaster.state === "questionSummary_points",
    playersRankingEnter: kidimieuxMaster.state.includes("playersRanking"),
    playersRankingLeave:
      kidimieuxMaster.state.includes("quizItemInfos") && kidimieuxMaster.questionNumber !== 1,
  };
};
