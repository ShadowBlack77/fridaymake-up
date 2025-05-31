import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CertificatesService } from "../services/certificates.service";
import { loadCertificates, loadCertificatesFailure, loadCertificatesSuccess } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CertificatesEffects {

  private readonly _actions: Actions = inject(Actions);
  private readonly _certificatesService: CertificatesService = inject(CertificatesService);

  loadCertificates$ = createEffect(() => {
    return this._actions.pipe(
      ofType(loadCertificates),
      switchMap(() => {
        return this._certificatesService.getAll().pipe(
          map((certificates) => loadCertificatesSuccess({ certificates })),
          catchError((error) => of(loadCertificatesFailure({ error })))
        )
      })
    )
  })
}