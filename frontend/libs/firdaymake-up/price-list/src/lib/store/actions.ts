import { createAction, props } from "@ngrx/store";
import { Price } from "../models/price.model";

export const loadPriceList = createAction('[PRICE LIST] Load Price List');
export const loadPriceListSuccess = createAction('[PRICE LIST SUCCESS] Load Price List Success', props<{ priceList: Price[] }>());
export const loadPriceListFailure = createAction('[PRICE LIST FAILURE] Load Price List Failure', props<{ error: any }>());

