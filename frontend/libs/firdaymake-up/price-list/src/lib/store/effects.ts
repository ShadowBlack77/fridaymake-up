import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PriceListService } from "../services/price-list.service";
import { loadPriceList, loadPriceListFailure, loadPriceListSuccess } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PriceListEffects {

  private readonly _actions: Actions = inject(Actions);
  private readonly _priceListService: PriceListService = inject(PriceListService);

  loadPriceList$ = createEffect(() => {
    return this._actions.pipe(
      ofType(loadPriceList),
      switchMap(() => {
        return this._priceListService.getAll().pipe(
          map((priceList) => {
            return loadPriceListSuccess({ priceList });
          }),
          catchError((error) => {
            return of(loadPriceListFailure({ error }))
          })
        )
      })
    )
  })
}