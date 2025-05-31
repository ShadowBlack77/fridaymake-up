import { inject, Injectable } from "@angular/core";
import { Price } from "../models/price.model";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ENVIRONMENTS_TOKEN, EnvironmentsConfig } from "@lib/core/environments";

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvironmentsConfig = inject(ENVIRONMENTS_TOKEN);

  getAll(): Observable<Price[]> {
    return this._httpClient.get<Price[]>(`${this._env.apiUrl}/price-list`);
  }
}