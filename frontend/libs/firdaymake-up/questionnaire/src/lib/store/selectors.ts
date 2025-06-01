import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuestionnaireState } from "./reducer";

const questionnaireFeatureSelector = createFeatureSelector<QuestionnaireState>('questionnaire');

export const selectQuestionnaire = createSelector(questionnaireFeatureSelector, (state: QuestionnaireState) => {
  return state.questionnaire
});

export const selectIsQuestionnaireAlreadySaved = createSelector(questionnaireFeatureSelector, (state: QuestionnaireState) => {
  return state.isAlreadySaved
});

export const selectUserQuestionnaire = createSelector(questionnaireFeatureSelector, (state: QuestionnaireState) => {
  return state.userQuestionnaire
});