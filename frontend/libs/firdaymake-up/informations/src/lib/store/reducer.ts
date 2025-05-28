import { createReducer, on } from "@ngrx/store";
import { SkinTypes } from "../models/skin-types.model";
import * as skinTypesActions from './actions';

export interface SkinTypesState {
  readonly skinTypes: SkinTypes[];
}

const InitialState: SkinTypesState = {
  skinTypes: []
}

export const skinTypesReducer = createReducer(
  InitialState,
  on(skinTypesActions.loadSkinTypesSuccess, (state, actions) => ({
    ...state,
    skinTypes: actions.skinTypes
  }))
)