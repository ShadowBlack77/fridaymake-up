import { createAction, props } from "@ngrx/store";
import { Certificate } from "../models/certificate.model";

export const loadCertificates = createAction('[CERTIFICATES] Load Certificates');
export const loadCertificatesSuccess = createAction('[CERTIFICATES] Load Certificates Success', props<{ certificates: Certificate[] }>());
export const loadCertificatesFailure = createAction('[CERTIFICATES] Load Certificates Failure', props<{ error: any }>());