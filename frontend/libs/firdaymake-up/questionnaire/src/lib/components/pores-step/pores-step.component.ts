import { AfterContentChecked, AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { debounceTime } from "rxjs";

@Component({
  selector: 'lib-pores-step',
  templateUrl: './pores-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: PoresStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class PoresStepComponent implements AfterContentInit, AfterContentChecked {

  private readonly _formBuilder = inject(FormBuilder);

  readonly form = this._formBuilder.group({
    pores: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    medicines: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    skinDiseases: new FormControl(false, {
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

  ngAfterContentChecked(): void {
    this.isValid.emit(true);
  }
}