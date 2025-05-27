import { createReducer, on } from "@ngrx/store";
import { Price } from "../models/price.model";
import * as priceListAction from './actions';

export interface PriceListState {
  readonly priceList: Price[];
}

const InitialState: PriceListState = {
  priceList: []
}

export const priceListReducer = createReducer(
  InitialState,
  on(priceListAction.loadPriceListSuccess, (state, actions) => ({
    ...state,
    priceList: actions.priceList
  }))
);