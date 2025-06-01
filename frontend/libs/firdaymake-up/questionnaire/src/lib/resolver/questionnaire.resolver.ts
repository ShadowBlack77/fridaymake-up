import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { QuestionnaireState } from "../store/reducer";
import { loadQuestionnaire } from "../store/actions";

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireResolver {
  
  private readonly _store: Store<QuestionnaireState> = inject(Store);

  resolve(): void {
    this._store.dispatch(loadQuestionnaire());
  }
}