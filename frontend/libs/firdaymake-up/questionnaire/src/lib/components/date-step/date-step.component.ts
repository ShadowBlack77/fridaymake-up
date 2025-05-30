import { AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveDate } from "../../store/actions";

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
export class DateStepComponent implements AfterContentInit {

  private readonly _store: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);

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

    this.form.valueChanges.pipe(
      debounceTime(100)
    ).subscribe((value) => {
      const date = {
        selectedDate: value.selectedDate!,
        selectedHour: value.selectedHour!
      }

      this._store.dispatch(saveDate({ date }));
    });
  }
}