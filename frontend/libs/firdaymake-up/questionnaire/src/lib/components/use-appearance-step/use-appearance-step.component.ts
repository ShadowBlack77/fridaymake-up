import { AfterContentChecked, AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveUseAppearance } from "../../store/actions";

@Component({
  selector: 'lib-use-appearance-step',
  templateUrl: './use-appearance-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: UseAppearanceStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class UseAppearanceStepComponent implements AfterContentInit, AfterContentChecked {

  private readonly _store: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);

  readonly form = this._formBuilder.group({
    useAppearance: new FormControl(false, {
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
      const useAppearance = {
        useAppearance: value.useAppearance!
      }

      this._store.dispatch(saveUseAppearance({ useAppearance }));
    });
  }

  ngAfterContentChecked(): void {
    const useAppearance = {
      useAppearance: this.form.get('useAppearance')?.value!
    };

    this._store.dispatch(saveUseAppearance({ useAppearance }));
    this.isValid.emit(true);
  }
}