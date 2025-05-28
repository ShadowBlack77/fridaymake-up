import { AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { debounceTime } from "rxjs";

@Component({
  selector: 'lib-allergy-step',
  templateUrl: './allergy-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: AllergyStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class AllergyStepComponent implements AfterContentInit {

  private readonly _formBuilder = inject(FormBuilder);

  readonly form = this._formBuilder.group({
    allergy: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    allergyIngredients: new FormControl('', {
      nonNullable: true,
    }),
    skinChanges: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    lenses: new FormControl(false, {
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
      console.log(value);
    });
  }
}