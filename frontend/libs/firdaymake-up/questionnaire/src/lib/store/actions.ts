import { createAction, props } from "@ngrx/store";
import { Questionnaire } from "../models/questionnaire.model";

export const loadQuestionnaireByUserId = createAction('[QUESTIONNAIRE] Load Questionnaire By User Id');
export const loadQuestionnaireByUserIdSuccess = createAction(
  '[QUESTIONNAIRE] Load Questionnaire By User Id Success', 
  props<{ questionnaire: Questionnaire | null }>()
);
export const loadQuestionnaireByUserIdFailure = createAction(
  '[QUESTIONNAIRE] Load Questionnaire By User Id Failure', 
  props<{ error: any }>()
);

export const saveContactDetails = createAction(
  '[QUESTIONNAIRE] Save Contact Details', 
  props<{ contactDetails: Pick<Questionnaire, 'name' | 'email' | 'phoneNumber' | 'service'> }>()
);
export const saveContactDetailsSuccess = createAction(
  '[QUESTIONNAIRE] Save Contact Details Success',
  props<{ contactDetails: Pick<Questionnaire, 'name' | 'email' | 'phoneNumber' | 'service'> }>()
);
export const saveCotnactDetailsFalure = createAction(
  '[QUESTIONNAIRE] Save Contact Details Failure', 
  props<{ error: any }>()
);

export const saveAllergy = createAction(
  '[QUESTIONNAIRE] Save Allergy',
  props<{ allergy: Pick<Questionnaire, 'allergy' | 'allergyIngredients' | 'skinChanges' | 'lenses'> }>()
);
export const saveAllergySuccess = createAction(
  '[QUESTIONNAIRE] Save Allergy Success',
  props<{ allergy: Pick<Questionnaire, 'allergy' | 'allergyIngredients' | 'skinChanges' | 'lenses'> }>()
);
export const saveAllergyFailure = createAction(
  '[QUESTIONNAIRE] Save Allergy Failure',
  props<{ error: any }>()
);

export const savePores = createAction(
  '[QUESTIONNAIRE] Save Pores',
  props<{ pores: Pick<Questionnaire, 'pores' | 'medicines' | 'skinDiseases'> }>()
);
export const savePoresSuccess = createAction(
  '[QUESTIONNAIRE] Save Pores Success',
  props<{ pores: Pick<Questionnaire, 'pores' | 'medicines' | 'skinDiseases'> }>()
);
export const savePoresFailure = createAction(
  '[QUESTIONNAIRE] Save Pores Failure',
  props<{ error: any }>()
);

export const saveIngredients = createAction(
  '[QUESTIONNAIRE] Save Ingredients',
  props<{ ingredients: Pick<Questionnaire, 'cosmeticsIngredients' | 'whichIngredients' | 'diseaseOne' | 'diseaseTwo'> }>()
);
export const saveIngredientsSuccess = createAction(
  '[QUESTIONNAIRE] Save Ingredients Success',
  props<{ ingredients: Pick<Questionnaire, 'cosmeticsIngredients' | 'whichIngredients' | 'diseaseOne' | 'diseaseTwo'> }>()
);
export const saveIngredientsFailure = createAction(
  '[QUESTIONNAIRE] Save Ingredients Failure',
  props<{ error: any }>()
);

export const saveDisease = createAction(
  '[QUESTIONNAIRE] Save Disease',
  props<{ disease: Pick<Questionnaire, 'diseaseThree' | 'skinShiny' | 'skinType'> }>()
);
export const saveDiseaseSuccess = createAction(
  '[QUESTIONNAIRE] Save Disease Success',
  props<{ disease: Pick<Questionnaire, 'diseaseThree' | 'skinShiny' | 'skinType'> }>()
);
export const saveDiseaseFailure = createAction(
  '[QUESTIONNAIRE] Save Disease Failure',
  props<{ error: any }>()
);

export const saveMakeUp = createAction(
  '[QUESTIONNAIRE] Save Make Up',
  props<{ makeUp: Pick<Questionnaire, 'expectedEffect'> }>()
);
export const saveMakeUpSuccess = createAction(
  '[QUESTIONNAIRE] Save Make Up Success',
  props<{ makeUp: Pick<Questionnaire, 'expectedEffect'> }>()
);
export const saveMakeUpFailure = createAction(
  '[QUESTIONNAIRE] Save Make Up Failure',
  props<{ error: any }>()
);

export const saveHairdo = createAction(
  '[QUESTIONNAIRE] Save Hairdo',
  props<{ hairdo: Pick<Questionnaire, 'hairdo'> }>()
);
export const saveHairdoSuccess = createAction(
  '[QUESTIONNAIRE] Save Hairdo Success',
  props<{ hairdo: Pick<Questionnaire, 'hairdo'> }>()
);
export const saveHairdoFailure = createAction(
  '[QUESTIONNAIRE] Save Hairdo Failure',
  props<{ error: any }>()
);

export const saveMakeUpLike = createAction(
  '[QUESTIONNAIRE] Save Make Up Like',
  props<{ makeUpLike: Pick<Questionnaire, 'makeUp'> }>()
);
export const saveMakeUpLikeSuccess = createAction(
  '[QUESTIONNAIRE] Save Make Up Like Success',
  props<{ makeUpLikeSuccess: Pick<Questionnaire, 'makeUp'>  }>()
);
export const saveMakeUpLikeFailure = createAction(
  '[QUESTIONNAIRE] Save Make Up Like Failure',
  props<{ error: any }>()
);

export const saveCream = createAction(
  '[QUESTIONNAIRE] Save Cream',
  props<{ cream: Pick<Questionnaire, 'cream'> }>()
);
export const saveCreamSuccess = createAction(
  '[QUESTIONNAIRE] Save Cream Success',
  props<{ cream: Pick<Questionnaire, 'cream'> }>()
);
export const saveCreamSuccessFailure = createAction(
  '[QUESTIONNAIRE] Save Cream Failure',
  props<{ error: any }>()
);

export const saveDate = createAction(
  '[QUESTIONNAIRE] Save Date',
  props<{ date: Pick<Questionnaire, 'selectedDate' | 'selectedHour'> }>()
);
export const saveDateSuccess = createAction(
  '[QUESTIONNAIRE] Save Date Success',
  props<{ date: Pick<Questionnaire, 'selectedDate' | 'selectedHour'> }>()
);
export const saveDateFailure = createAction(
  '[QUESTIONNAIRE] Save Date Failure',
  props<{ error: any }>()
);

export const saveUseAppearance = createAction(
  '[QUESTIONNAIRE] Save Use Appearance',
  props<{ useAppearance: Pick<Questionnaire, 'useAppearance'> }>()
);
export const saveUseAppearanceSuccess = createAction(
  '[QUESTIONNAIRE] Save Use Appearance Success',
  props<{ useApearance: Pick<Questionnaire, 'useAppearance'> }>()
);
export const saveUseAppearanceFailure = createAction(
  '[QUESTIONNAIRE] Save Use Appearance Failure',
  props<{ error: any }>()
);

export const saveQuestionnaire = createAction(
  '[QUESTIONNAIRE] Save Questionnaire', 
  props<{ questionnaire: Questionnaire }>()
);
export const saveQuestionnaireSuccess = createAction('[QUESTIONNAIRE] Save Questionnaire Success');
export const saveQuestionnaireFailure = createAction(
  '[QUESTIONNAIRE] Save Questionnaire Faliure', 
  props<{ error: any }>()
);