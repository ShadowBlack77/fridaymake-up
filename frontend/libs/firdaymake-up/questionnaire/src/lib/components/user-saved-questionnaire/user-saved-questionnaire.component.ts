import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { QuestionnaireState } from "../../store/reducer";
import { Observable } from "rxjs";
import { selectIsQuestionnaireAlreadySaved } from "../../store/selectors";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'lib-user-saved-questionnaire',
  templateUrl: './user-saved-questionnaire.component.html',
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class UserSavedQuestionnaireComponent {

  private readonly _store: Store<QuestionnaireState> = inject(Store);

  protected readonly isQuestionnaireAlreadySaved$: Observable<boolean> = this._store.select(selectIsQuestionnaireAlreadySaved);
}