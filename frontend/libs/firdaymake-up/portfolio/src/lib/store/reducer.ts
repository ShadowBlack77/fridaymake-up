import { createReducer, on } from "@ngrx/store";
import { Portfolio } from "../models/portoflio.model";
import * as portfolioActions from './actions';

export interface PortfolioState {
  portfolio: Portfolio[]
}

const InitialState: PortfolioState = {
  portfolio: []
}

export const portfolioReducer = createReducer(
  InitialState,
  on(portfolioActions.loadPortfolioSuccess, (state, actions) => ({
    ...state,
    portfolio: actions.portfolio
  }))
);