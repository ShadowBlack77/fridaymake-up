import { createAction, props } from "@ngrx/store";
import { SkinTypes } from "../models/skin-types.model";

export const loadSkinTypes = createAction('[SKIN TYPES] Load Skin Types');
export const loadSkinTypesSuccess = createAction('[SKIN TYPES] Load Skin Types Success', props<{ skinTypes: SkinTypes[] }>());
export const loadSkinTypesFailure = createAction('[SKIN TYPES] Load Skin Types Failure', props<{ error: any }>());