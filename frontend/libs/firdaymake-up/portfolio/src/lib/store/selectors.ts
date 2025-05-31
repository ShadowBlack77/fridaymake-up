import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PortfolioState } from "./reducer";

const portfolioFeatureSelector = createFeatureSelector<PortfolioState>('portfolio');

export const selectPortfolio = createSelector(portfolioFeatureSelector, (state: PortfolioState) => {
  return state.portfolio
});