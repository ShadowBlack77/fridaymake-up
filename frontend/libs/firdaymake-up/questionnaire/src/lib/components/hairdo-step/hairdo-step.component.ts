import { AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControlStatus, ReactiveFormsModule } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { debounceTime } from "rxjs";

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
export class HairdoStepComponent implements AfterContentInit {

  private readonly _formBuilder = inject(FormBuilder);

  readonly form = this._formBuilder.group({

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