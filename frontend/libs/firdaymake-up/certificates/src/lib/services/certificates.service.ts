import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Certificate } from "../models/certificate.model";
import { ENVIRONMENTS_TOKEN, EnvironmentsConfig } from "@lib/core/environments";

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvironmentsConfig = inject(ENVIRONMENTS_TOKEN);
  
  getAll(): Observable<Certificate[]> {
    return this._httpClient.get<Certificate[]>(`${this._env.apiUrl}/certificates`);
  }
}