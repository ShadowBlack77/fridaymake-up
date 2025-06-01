import { AfterContentInit, Component, contentChild, inject, input, InputSignal, OnDestroy } from "@angular/core";
import { QuestionnaireState, saveQuestionnaire, selectIsQuestionnaireAlreadySaved, selectQuestionnaire, updateQuestionnaire } from "@lib/fridaymake-up/questionnaire";
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
  
  readonly questionnaireId: InputSignal<string | undefined> = input();

  ngAfterContentInit(): void {
    this._stepper()?.submitEmmiter.subscribe(() => {
      this._questionnaireStore.select(selectQuestionnaire).pipe(
        take(1)
      ).subscribe({
        next: (data) => {
          if (!this.questionnaireId()) {
            this._questionnaireStore.dispatch(saveQuestionnaire({ questionnaire: data! }));

            return;
          } 

          this._questionnaireStore.dispatch(updateQuestionnaire({ questionnaireId: this.questionnaireId()!, questionnaire: data! }));
        }
      })
    })

    this._questionnaireStore.select(selectIsQuestionnaireAlreadySaved).pipe(
      takeUntil(this._destroy$)
    ).subscribe({
      next: (data) => {
        this._stepper()?.isAlreadySaved.set(this.questionnaireId() ? false : data);
      }
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}