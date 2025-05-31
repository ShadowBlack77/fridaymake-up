import { createReducer, on } from "@ngrx/store";
import { Questionnaire } from "../models/questionnaire.model";
import * as questionnaireActions from './actions';

export interface QuestionnaireState {
  readonly questionnaire: Questionnaire | null;
  readonly isAlreadySaved: boolean;
}

const InitialState: QuestionnaireState = {
  questionnaire: null,
  isAlreadySaved: false
}

export const questionnaireReducer = createReducer(
  InitialState,
  on(questionnaireActions.loadQuestionnaireByUserIdSuccess, (state, actions) => {

    return {
      ...state,
      questionnaire: actions.questionnaire,
      isAlreadySaved: actions.questionnaire ? true : false
    }
  }),
  on(questionnaireActions.saveContactDetails, (state, actions) => ({
    ...state,
    questionnaire: { ...state.questionnaire!, ...actions.contactDetails }
  })),
  on(questionnaireActions.saveAllergy, (state, actions) => ({
    ...state,
    questionnaire: { ...state.questionnaire!, ...actions.allergy }
  })),
  on(questionnaireActions.savePores, (state, actions) => ({
    ...state,
    questionnaire: { ...state.questionnaire!, ...actions.pores }
  })),
  on(questionnaireActions.saveIngredients, (state, actions) => ({
    ...state,
    questionnaire: { ...state.questionnaire!, ...actions.ingredients }
  })),
  on(questionnaireActions.saveDisease, (state, actions) => ({
    ...state,
    questionnaire: { ...state.questionnaire!, ...actions.disease }
  })),
  on(questionnaireActions.saveMakeUp, (state, actions) => ({
    ...state,
    questionnaire: { ...state.questionnaire!, ...actions.makeUp }
  })),
  on(questionnaireActions.saveHairdo, (state, actions) => ({
    ...state,
    questionnaire: { ...state.questionnaire!, ...actions.hairdo }
  })),
  on(questionnaireActions.saveMakeUpLike, (state, actions) => ({
    ...state,
    questionnaire: { ...state.questionnaire!, ...actions.makeUpLike }
  })),
  on(questionnaireActions.saveCream, (state, actions) => ({
    ...state,
    questionnaire: { ...state.questionnaire!, ...actions.cream }
  })),
  on(questionnaireActions.saveDate, (state, actions) => ({
    ...state,
    questionnaire: {  ...state.questionnaire!, ...actions.date }
  })),
  on(questionnaireActions.saveUseAppearance, (state, actions) => ({
    ...state,
    questionnaire: { ...state.questionnaire!, ...actions.useAppearance }
  })),
  on(questionnaireActions.saveQuestionnaire, (state, actions) => ({
    ...state,
    questionnaire: actions.questionnaire
  })),
  on(questionnaireActions.saveQuestionnaireSuccess, (state) => ({
    ...state,
    isAlreadySaved: true
  }))
)