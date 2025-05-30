import { AfterContentChecked, AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveHairdo } from "../../store/actions";

@Component({
  selector: 'lib-hairdo-step',
  templateUrl: './hairdo-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: HairdoStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class HairdoStepComponent implements AfterContentInit, AfterContentChecked {

  private readonly _store: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);

  readonly form = this._formBuilder.group({
    hairdo: new FormControl('', {
      nonNullable: false
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
      const hairdo = {
        hairdo: value.hairdo!
      }

      this._store.dispatch(saveHairdo({ hairdo }));
    });
  }

  ngAfterContentChecked(): void {
    const hairdo = {
      hairdo: this.form.get('hairdo')?.value!
    }

    this._store.dispatch(saveHairdo({ hairdo }));
    this.isValid.emit(true);
  }
}