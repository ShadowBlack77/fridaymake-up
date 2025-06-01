import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { QuestionnaireService } from "../service/questionnaire.service";
import { loadQuestionnaire, loadQuestionnaireFailure, loadQuestionnaireSuccess, saveContactDetails, saveContactDetailsSuccess, saveQuestionnaire, saveQuestionnaireFailure, saveQuestionnaireSuccess, updateQuestionnaire, updateQuestionnaireFailure, updateQuestionnaireSuccess } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireEffects {

  private readonly _actions: Actions = inject(Actions);
  private readonly _questionnaireService = inject(QuestionnaireService);

  loadQuestionnaire$ = createEffect(() => {
    return this._actions.pipe(
      ofType(loadQuestionnaire),
      switchMap(() => {
        return this._questionnaireService.getOneByUserId().pipe(
          map((questionnaire) => {
            return loadQuestionnaireSuccess({ questionnaire });
          }),
          catchError((error) => {
            return of(loadQuestionnaireFailure({ error }));
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

  updateQuestionniare$ = createEffect(() => {
    return this._actions.pipe(
      ofType(updateQuestionnaire),
      switchMap(({ questionnaireId, questionnaire }) => {
        return this._questionnaireService.update(questionnaireId, questionnaire).pipe(
          map(() => {
            return updateQuestionnaireSuccess();
          }),
          catchError((error) => {
            return of(updateQuestionnaireFailure({ error }));
          })
        )
      })
    )
  })
}