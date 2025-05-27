import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PriceListState } from "./reducer";

const priceListSelectFeature = createFeatureSelector<PriceListState>('priceList');

export const selectPriceList = createSelector(priceListSelectFeature, (state: PriceListState) => {
  return state.priceList
});