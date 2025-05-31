import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SkinTypes } from "../models/skin-types.model";
import { HttpClient } from "@angular/common/http";
import { ENVIRONMENTS_TOKEN, EnvironmentsConfig } from "@lib/core/environments";

@Injectable({
  providedIn: 'root'
})
export class InformationsService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvironmentsConfig = inject(ENVIRONMENTS_TOKEN);

  getAll(): Observable<SkinTypes[]> {
    return this._httpClient.get<SkinTypes[]>(`${this._env.apiUrl}/informations`);
  }
}