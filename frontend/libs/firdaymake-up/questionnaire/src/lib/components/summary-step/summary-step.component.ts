import { AfterContentChecked, Component, output, OutputEmitterRef } from "@angular/core";
import { RouterLink } from "@angular/router";
import { STEP_VALIDATION } from "@lib/core/tokens";

@Component({
  selector: 'lib-summary-step',
  templateUrl: './summary-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: SummaryStepComponent
    }
  ],
  imports: [
    RouterLink
  ]
})
export class SummaryStepComponent implements AfterContentChecked {

  readonly isValid: OutputEmitterRef<boolean> = output<boolean>();

  ngAfterContentChecked(): void {
    this.isValid.emit(true);
  }
}