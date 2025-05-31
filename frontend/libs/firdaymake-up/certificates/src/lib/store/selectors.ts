import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CertificatesState } from "./reducer";

const certificatesFeatureSelector = createFeatureSelector<CertificatesState>('certificates');

export const selectCertificates = createSelector(certificatesFeatureSelector, (state: CertificatesState) => {
  return state.certificates
});