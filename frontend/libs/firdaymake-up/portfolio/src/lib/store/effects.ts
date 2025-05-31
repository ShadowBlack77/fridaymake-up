import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PortfolioService } from "../services/portfolio.service";
import { loadPortfolio, loadPortfolioFailure, loadPortfolioSuccess } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PortfolioEffects {

  private readonly _actions: Actions = inject(Actions);
  private readonly _portfolioService: PortfolioService = inject(PortfolioService);

  loadPortfolio$ = createEffect(() => {
    return this._actions.pipe(
      ofType(loadPortfolio),
      switchMap(() => {
        return this._portfolioService.getAll().pipe(
          map((portfolio) => loadPortfolioSuccess({ portfolio })),
          catchError((error) => of(loadPortfolioFailure({ error })))
        )
      })
    )
  })
}