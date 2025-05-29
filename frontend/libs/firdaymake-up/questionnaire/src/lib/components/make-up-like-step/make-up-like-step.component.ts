import { AfterContentChecked, AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { debounceTime } from "rxjs";

@Component({
  selector: 'lib-make-up-like-step',
  templateUrl: './make-up-like-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: MakeUpLikeStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class MakeUpLikeStepComponent implements AfterContentInit, AfterContentChecked {

  private readonly _formBuilder = inject(FormBuilder);

  readonly form = this._formBuilder.group({
    expectedEffect: new FormControl('', {
      nonNullable: false,
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