import { AfterContentChecked, AfterContentInit, Component, inject, OnDestroy, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime, Subject, takeUntil } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveCream } from "../../store/actions";
import { selectUserQuestionnaire } from "../../store/selectors";

@Component({
  selector: 'lib-cream-step',
  templateUrl: './cream-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: CreamStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class CreamStepComponent implements AfterContentInit, AfterContentChecked, OnDestroy {
  
  private readonly _store: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  readonly form = this._formBuilder.group({
    cream: new FormControl('', {
      nonNullable: false
    })
  });

  readonly isValid: OutputEmitterRef<boolean> = output<boolean>();

  ngAfterContentInit(): void {
    this.form.statusChanges.subscribe((status: FormControlStatus) => {
      this.isValid.emit(status === 'VALID');
    });

    this._store.select(selectUserQuestionnaire).pipe(
      takeUntil(this._destroy$)
    ).subscribe({
      next: (data) => {
        if (data) {
          this.form.patchValue({
            cream: data.cream
          });
        }
      }
    });

    this.form.valueChanges.pipe(
      debounceTime(100),
      takeUntil(this._destroy$)
    ).subscribe((value) => {
      const cream = {
        cream: value.cream!
      }

      this._store.dispatch(saveCream({ cream }));
    });
  }

  ngAfterContentChecked(): void {
    const cream = {
      cream: this.form.get('cream')?.value!
    };

    this._store.dispatch(saveCream({ cream }));
    this.isValid.emit(true);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}