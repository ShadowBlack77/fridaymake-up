import { createAction, props } from "@ngrx/store";
import { Portfolio } from "../models/portoflio.model";

export const loadPortfolio = createAction('[PORTFOLIO] Load Portfolio');
export const loadPortfolioSuccess = createAction('[PORTFOLIO] Load Portfolio Success', props<{ portfolio: Portfolio[] }>());
export const loadPortfolioFailure = createAction('[PORTFOLIO] Load Portfolio Failure', props<{ error: any }>());