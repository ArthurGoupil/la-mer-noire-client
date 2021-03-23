// import React from "react";

// import { CaPasseOuCaCashPoints } from "constants/CaPasseOuCaCash.constants";
// import { CookieName } from "constants/Cookies.constants";
// import {
//   Answer,
//   PlayersPoints,
//   QuestionRecord,
//   KidimieuxMaster,
// } from "models/Game.model";
// import { QuizItemData, QuizLevel } from "models/Quiz.model";
// import { getCookie, setCookie } from "utils/cookies.util";
// import { getQuizLevelByQuestionNumber } from "utils/quiz/getQuizLevelByQuestionNumber.util";
// import { useQuizLifetime } from "hooks/quiz/useQuizLifetime.hook";
// import { QuizDuration } from "constants/QuizDuration.constants";

// interface UseKidimieuxMasterProps {
//   shortId: string;
//   quizItemData: QuizItemData;
//   allPlayersHaveAnswered: boolean;
//   playersAnswers: Record<string, Answer>;
//   quizItemSignature: string;
//   quizLevel: QuizLevel;
// }

// interface UseKidimieuxReturn {
//   kidimieuxMaster: KidimieuxMaster;
//   questionsRecord: Record<string, QuestionRecord>;
// }

// export const useKidimieuxMaster = ({
//   shortId,
//   quizItemData,
//   allPlayersHaveAnswered,
//   playersAnswers,
//   quizItemSignature,
//   quizLevel,
// }: UseKidimieuxMasterProps): UseKidimieuxReturn => {
//   const [kidimieuxMaster, setKidimieuxMaster] = React.useState<KidimieuxMaster>(
//     getCookie({
//       prefix: shortId,
//       cookieName: CookieName.kidimieuxMaster,
//     }),
//   );

//   const { questionsRecord } = useQuizLifetime({
//     shortId,
//     quizItemSignature,
//     allPlayersHaveAnswered,
//     duration: QuizDuration.kidimieux,
//     shouldSetBaseTimestamp: kidimieuxMaster.state === "question_fetchTimestamp",
//   });

//   React.useEffect(() => {
//     const updateKidimieuxMaster = ({
//       state,
//       quizLevel,
//       questionNumber,
//       playersPoints,
//       currentAnswerType,
//     }: Partial<KidimieuxMaster>) => {
//       const newKidimieuxMaster = {
//         state: state || kidimieuxMaster.state,
//         quizLevel: quizLevel || kidimieuxMaster.quizLevel,
//         questionNumber: questionNumber || kidimieuxMaster.questionNumber,
//         playersPoints: playersPoints || kidimieuxMaster.playersPoints,
//         currentAnswerType: currentAnswerType || kidimieuxMaster.currentAnswerType,
//       };
//       setCookie<KidimieuxMaster>({
//         prefix: shortId,
//         cookieName: CookieName.caPasseOuCaCashMaster,
//         cookieValue: newKidimieuxMaster,
//       });
//       setKidimieuxMaster(newKidimieuxMaster);
//     };

//     switch (caPasseOuCaCashMaster.state) {
//       case "stageName_wait":
//         const stageNameWaitTimeout = setTimeout(() => {
//           updateCaPasseOuCaCashMaster({
//             state: "stageName",
//           });
//         }, 2000);
//         return () => clearTimeout(stageNameWaitTimeout);
//       case "stageName":
//         const stageNameTimeout = setTimeout(() => {
//           updateCaPasseOuCaCashMaster({
//             state: "stageName_topScreensBackgroundSound",
//           });
//         }, 6000);
//         return () => clearTimeout(stageNameTimeout);
//       case "stageName_topScreensBackgroundSound":
//         updateCaPasseOuCaCashMaster({
//           state: "quizItemInfos",
//         });
//         break;
//       case "quizItemInfos":
//         const quizItemInfosTimeout = setTimeout(() => {
//           updateCaPasseOuCaCashMaster({
//             state: "quizItemInfos_fetchQuizItemData",
//           });
//         }, 1500);
//         return () => clearTimeout(quizItemInfosTimeout);
//       case "quizItemInfos_fetchQuizItemData":
//         updateCaPasseOuCaCashMaster({
//           state: "quizItemInfos_checkQuizIsReady",
//         });
//         break;
//       case "quizItemInfos_checkQuizIsReady":
//         if (quizItemData && !questionsRecord[quizItemData?.quizItemSignature]?.isDone) {
//           updateCaPasseOuCaCashMaster({
//             state: "quizItemInfos_showThemeSubTheme",
//           });
//         }
//         break;
//       case "quizItemInfos_showThemeSubTheme":
//         const showThemeSubThemeTimeout = setTimeout(() => {
//           updateCaPasseOuCaCashMaster({
//             state: "question_fetchTimestamp",
//           });
//         }, 4000);
//         return () => clearTimeout(showThemeSubThemeTimeout);
//       case "question_fetchTimestamp":
//         updateCaPasseOuCaCashMaster({
//           state: "question_screensTransitionSound",
//         });
//         break;
//       case "question_screensTransitionSound":
//         updateCaPasseOuCaCashMaster({
//           state: "question",
//         });
//         break;
//       case "question":
//         if (allPlayersHaveAnswered) {
//           updateCaPasseOuCaCashMaster({
//             state: "questionMustTimeout",
//           });
//         } else if (questionsRecord[quizItemData?.quizItemSignature]?.isDone) {
//           updateCaPasseOuCaCashMaster({
//             state: "questionIsTimedOut",
//           });
//         }
//         break;
//       case "questionMustTimeout":
//         const questionMustTimeoutTimeout = setTimeout(() => {
//           updateCaPasseOuCaCashMaster({
//             state: "questionSummary_topScreensBackgroundSound",
//             playersPoints: getPlayersPoints(),
//           });
//         }, 2000);
//         return () => clearTimeout(questionMustTimeoutTimeout);
//       case "questionIsTimedOut":
//         const questionIsTimedOutTimeout = setTimeout(() => {
//           updateCaPasseOuCaCashMaster({
//             state: "questionSummary_topScreensBackgroundSound",
//             playersPoints: getPlayersPoints(),
//           });
//         }, 1000);
//         return () => clearTimeout(questionIsTimedOutTimeout);
//       case "questionSummary_topScreensBackgroundSound":
//         updateCaPasseOuCaCashMaster({
//           state: "questionSummary",
//         });
//         break;
//       case "questionSummary":
//         const questionSummaryTimeout = setTimeout(() => {
//           updateCaPasseOuCaCashMaster({
//             state: "questionSummary_points",
//           });
//         }, 3000);
//         return () => clearTimeout(questionSummaryTimeout);
//       case "questionSummary_points":
//         const questionSummary_pointsTimeout = setTimeout(() => {
//           updateCaPasseOuCaCashMaster({
//             state: "questionSummary_screenTransitionSound",
//           });
//         }, 7000);
//         return () => clearTimeout(questionSummary_pointsTimeout);
//       case "questionSummary_screenTransitionSound":
//         updateCaPasseOuCaCashMaster({
//           state: "playersRanking_previous",
//         });
//         break;
//       case "playersRanking_previous":
//         const playersRanking_previousTimeout = setTimeout(() => {
//           updateCaPasseOuCaCashMaster({
//             state: "playersRanking_current",
//           });
//         }, 3000);
//         return () => clearTimeout(playersRanking_previousTimeout);
//       case "playersRanking_current":
//         let playersRanking_currentTimeout: NodeJS.Timeout;
//         if (caPasseOuCaCashMaster.questionNumber < 9) {
//           playersRanking_currentTimeout = setTimeout(() => {
//             const questionNumber = (caPasseOuCaCashMaster.questionNumber + 1) as QuestionNumber;
//             updateCaPasseOuCaCashMaster({
//               quizLevel: getQuizLevelByQuestionNumber({ questionNumber }),
//               questionNumber,
//               state: "playersRanking_screenTransitionSound",
//             });
//           }, 5000);
//         }
//         return () => clearTimeout(playersRanking_currentTimeout);
//       case "playersRanking_screenTransitionSound":
//         updateCaPasseOuCaCashMaster({
//           state: "quizItemInfos",
//         });
//         break;
//     }
//   }, [
//     allPlayersHaveAnswered,
//     caPasseOuCaCashMaster.playersPoints,
//     caPasseOuCaCashMaster.questionNumber,
//     caPasseOuCaCashMaster.quizLevel,
//     caPasseOuCaCashMaster.state,
//     playersAnswers,
//     questionsRecord,
//     quizItemData,
//     quizLevel,
//     shortId,
//   ]);

//   return { caPasseOuCaCashMaster, questionsRecord };
// };

export const useKidimieuxMaster = (): string => {
  return "yo";
};
