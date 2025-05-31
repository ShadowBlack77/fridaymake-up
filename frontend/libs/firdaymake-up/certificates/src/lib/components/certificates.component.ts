import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { CertificatesState } from "../store/reducer";
import { Observable } from "rxjs";
import { Certificate } from "../models/certificate.model";
import { selectCertificates } from "../store/selectors";

@Component({
  selector: 'lib-certificates-masonary',
  templateUrl: './certificates.component.html',
  imports: [
    NgOptimizedImage,
    CommonModule
  ],
})
export class CertificatesMasonaryComponent {

  private readonly _store: Store<CertificatesState> = inject(Store);

  protected readonly certificates$: Observable<Certificate[]> = this._store.select(selectCertificates);
}