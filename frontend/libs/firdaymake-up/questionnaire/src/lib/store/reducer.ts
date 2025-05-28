import { createReducer, on } from "@ngrx/store";
import { Questionnaire } from "../models/questionnaire.model";
import * as questionnaireActions from './actions';

export interface QuestionnaireState {
  readonly questionnaire: Questionnaire | null;
}

const InitialState: QuestionnaireState = {
  questionnaire: null
}

export const questionnaireReducer = createReducer(
  InitialState,
  on(questionnaireActions.loadQuestionnaireByUserIdSuccess, (state, actions) => ({
    ...state,
    questionnaire: actions.questionnaire
  })),
  on(questionnaireActions.saveContactDetails, (state, actions) => ({
    ...state,
    questionnaire: { ...state.questionnaire!, ...actions.contactDetails }
  })),
  on(questionnaireActions.saveQuestionnaire, (state, actions) => ({
    ...state,
    questionnaire: actions.questionnaire
  }))
)