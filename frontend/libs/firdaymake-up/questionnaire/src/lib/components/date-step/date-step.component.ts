import { AfterContentChecked, AfterContentInit, Component, inject, OnDestroy, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime, Subject, takeUntil } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveDate } from "../../store/actions";
import { selectUserQuestionnaire } from "../../store/selectors";

@Component({
  selector: 'lib-date-step',
  templateUrl: './date-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: DateStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class DateStepComponent implements AfterContentInit, AfterContentChecked, OnDestroy {

  private readonly _store: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  readonly form = this._formBuilder.group({
    selectedDate: new FormControl(new Date(), {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    selectedHour: new FormControl('00:00:00', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
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
            selectedDate: data.selectedDate,
            selectedHour: data.selectedHour
          });
        }
      }
    });

    this.form.valueChanges.pipe(
      debounceTime(100),
      takeUntil(this._destroy$)
    ).subscribe((value) => {
      const date = {
        selectedDate: value.selectedDate!,
        selectedHour: value.selectedHour!
      }

      this._store.dispatch(saveDate({ date }));
    });
  }

  ngAfterContentChecked(): void {
    if (this.form.get('selectedHour')?.value) {
      this.isValid.emit(true);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}