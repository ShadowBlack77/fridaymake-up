import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { InformationsService } from "../services/informations.service";
import { loadSkinTypes, loadSkinTypesFailure, loadSkinTypesSuccess } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SkinTypesEffects {

  private readonly _actions: Actions = inject(Actions);
  private readonly _informationsService: InformationsService = inject(InformationsService);

  loadSkinTypes$ = createEffect(() => {
    return this._actions.pipe(
      ofType(loadSkinTypes),
      switchMap(() => {
        return this._informationsService.getAll().pipe(
          map((skinTypes) => {
            return loadSkinTypesSuccess({ skinTypes });
          }),
          catchError((error) => {
            return of(loadSkinTypesFailure({ error }));
          })
        )
      })
    )
  })
}