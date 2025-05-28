import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SkinTypesState } from "./reducer";

const skinTypesFeatureSelect = createFeatureSelector<SkinTypesState>('skinTypes');

export const selectSkinTypes = createSelector(skinTypesFeatureSelect, (state: SkinTypesState) => {
  return state.skinTypes
});