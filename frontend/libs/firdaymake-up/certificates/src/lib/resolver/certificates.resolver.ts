import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { CertificatesState } from "../store/reducer";
import { loadCertificates } from "../store/actions";

@Injectable({
  providedIn: 'root'
})
export class CertificatesResolver {

  private readonly _store: Store<CertificatesState> = inject(Store);

  resolve(): void {
    this._store.dispatch(loadCertificates());
  }
}