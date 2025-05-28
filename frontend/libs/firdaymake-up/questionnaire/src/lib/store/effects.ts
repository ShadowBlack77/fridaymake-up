import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { QuestionnaireService } from "../service/questionnaire.service";
import { loadQuestionnaireByUserId, loadQuestionnaireByUserIdFailure, loadQuestionnaireByUserIdSuccess, saveContactDetails, saveContactDetailsSuccess, saveQuestionnaire, saveQuestionnaireFailure, saveQuestionnaireSuccess } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireEffects {

  private readonly _actions: Actions = inject(Actions);
  private readonly _questionnaireService = inject(QuestionnaireService);

  loadQuestionnaireByUserId$ = createEffect(() => {
    return this._actions.pipe(
      ofType(loadQuestionnaireByUserId),
      switchMap(() => {
        return this._questionnaireService.getOneByUserId().pipe(
          map((questionnaire) => {
            return loadQuestionnaireByUserIdSuccess({ questionnaire });
          }),
          catchError((error) => {
            return of(loadQuestionnaireByUserIdFailure({ error }));
          })
        )
      })
    )
  });

  saveContactDetails$ = createEffect(() => {
    return this._actions.pipe(
      ofType(saveContactDetails),
      map((contactDetails) => {
        return saveContactDetailsSuccess(contactDetails);
      })
    )
  })

  saveQuestionnaire$ = createEffect(() => {
    return this._actions.pipe(
      ofType(saveQuestionnaire),
      switchMap(({ questionnaire }) => {
        return this._questionnaireService.save(questionnaire).pipe(
          map(() => {
            return saveQuestionnaireSuccess();
          }),
          catchError((error) => {
            return of(saveQuestionnaireFailure({ error }));
          })
        )
      })
    )
  });
}