import { AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";

@Component({
  selector: 'lib-contact-details-step',
  templateUrl: './contact-details-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: ContactDetailsStepComponent
    }
  ]
})
export class ContactDetailsStepComponent implements AfterContentInit {

  private readonly _formBuilder = inject(FormBuilder);

  readonly form = this._formBuilder.group({

  });

  readonly isValid: OutputEmitterRef<boolean> = output<boolean>();

  ngAfterContentInit(): void {
    this.form.statusChanges.subscribe((status: FormControlStatus) => {
      this.isValid.emit(status === 'VALID');
    })
  }
}