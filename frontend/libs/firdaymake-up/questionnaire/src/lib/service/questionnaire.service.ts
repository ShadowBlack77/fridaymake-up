import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Questionnaire } from "../models/questionnaire.model";
import { ENVIRONMENTS_TOKEN, EnvironmentsConfig } from "@lib/core/environments";

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _env: EnvironmentsConfig = inject(ENVIRONMENTS_TOKEN);

  getOneByUserId(): Observable<Questionnaire | null> {
    return this._httpClient.get<Questionnaire | null>(`${this._env.apiUrl}/questionnaire`, { withCredentials: true });
  }

  save(questionnaire: Questionnaire): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/questionnaire`, questionnaire, { withCredentials: true });
  }

  update(questionnaireId: string, questionnaire: Questionnaire): Observable<unknown> {
    return this._httpClient.put<unknown>(`${this._env.apiUrl}/questionnaire/${questionnaireId}`, questionnaire, { withCredentials: true });
  }
}