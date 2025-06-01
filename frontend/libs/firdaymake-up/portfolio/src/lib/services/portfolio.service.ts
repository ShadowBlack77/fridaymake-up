import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENVIRONMENTS_TOKEN, EnvironmentsConfig } from "@lib/core/environments";
import { Observable } from "rxjs";
import { Portfolio } from "../models/portoflio.model";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvironmentsConfig = inject(ENVIRONMENTS_TOKEN);
  
  getAll(): Observable<Portfolio[]> {
    console.log(`${this._env.apiUrl}/portfolio`);
    return this._httpClient.get<Portfolio[]>(`${this._env.apiUrl}/portfolio`);
  }
}