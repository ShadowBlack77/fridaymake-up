import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Questionnaire } from "../models/questionnaire.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private readonly _httpClient: HttpClient = inject(HttpClient);

  getOneByUserId(): Observable<Questionnaire | null> {
    return of(null);
  }

  save(questionnaire: Questionnaire): Observable<unknown> {
    console.log(questionnaire);
    return of(true);
  }
}