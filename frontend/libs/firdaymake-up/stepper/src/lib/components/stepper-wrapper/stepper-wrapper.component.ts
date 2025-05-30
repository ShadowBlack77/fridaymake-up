import { AfterContentInit, Component, contentChild, inject } from "@angular/core";
import { QuestionnaireState, saveQuestionnaire, selectIsQuestionnaireAlreadySaved, selectQuestionnaire } from "@lib/fridaymake-up/questionnaire";
import { StepperComponent } from "@lib/shared/stepper";
import { Store } from "@ngrx/store";
import { take } from "rxjs";

@Component({
  selector: 'lib-stepper-wrapper',
  templateUrl: './stepper-wrapper.component.html'
})
export class StepperWrapperComponent implements AfterContentInit {
  
  private readonly _questionnaireStore: Store<QuestionnaireState> = inject(Store);
  private readonly _stepper = contentChild(StepperComponent);

  ngAfterContentInit(): void {
    this._stepper()?.submitEmmiter.subscribe(() => {
      this._questionnaireStore.select(selectQuestionnaire).pipe(
        take(1)
      ).subscribe({
        next: (data) => {
          this._questionnaireStore.dispatch(saveQuestionnaire({ questionnaire: data! }));
        }
      })
    })

    this._questionnaireStore.select(selectIsQuestionnaireAlreadySaved).pipe(
      take(1)
    ).subscribe({
      next: (data) => {
        this._stepper()?.isAlreadySaved.set(data);
      }
    })
  }
}