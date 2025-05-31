import { createReducer, on } from "@ngrx/store";
import { Certificate } from "../models/certificate.model";
import * as certificatesActions from './actions';

export interface CertificatesState {
  readonly certificates: Certificate[]
}

const InitialState: CertificatesState = {
  certificates: []
}

export const certificatesReducer = createReducer(
  InitialState,
  on(certificatesActions.loadCertificatesSuccess, (state, actions) => ({
    ...state,
    certificates: actions.certificates
  }))
)