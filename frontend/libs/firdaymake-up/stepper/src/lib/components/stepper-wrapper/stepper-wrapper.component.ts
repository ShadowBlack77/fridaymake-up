import { AfterContentInit, Component, contentChild, inject, OnDestroy } from "@angular/core";
import { QuestionnaireState, saveQuestionnaire, selectIsQuestionnaireAlreadySaved, selectQuestionnaire } from "@lib/fridaymake-up/questionnaire";
import { StepperComponent } from "@lib/shared/stepper";
import { Store } from "@ngrx/store";
import { Subject, take, takeUntil } from "rxjs";

@Component({
  selector: 'lib-stepper-wrapper',
  templateUrl: './stepper-wrapper.component.html'
})
export class StepperWrapperComponent implements AfterContentInit, OnDestroy {
  
  private readonly _questionnaireStore: Store<QuestionnaireState> = inject(Store);
  private readonly _stepper = contentChild(StepperComponent);
  private readonly _destroy$: Subject<void> = new Subject<void>();

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
      takeUntil(this._destroy$)
    ).subscribe({
      next: (data) => {
        this._stepper()?.isAlreadySaved.set(data);
      }
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}