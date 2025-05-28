import { AfterContentInit, Component, contentChild, signal, WritableSignal } from "@angular/core";
import { STEP_VALIDATION } from "@lib/core/tokens";

@Component({
  selector: 'lib-step',
  templateUrl: './step.component.html'
})
export class StepComponent implements AfterContentInit {

  private readonly _form = contentChild(STEP_VALIDATION, { descendants: true });

  ngAfterContentInit(): void {
    this._form().isValid.subscribe((valid: boolean) => {
      this.isValid.set(valid);
    })
  }

  readonly isValid: WritableSignal<boolean> = signal(false);
  readonly isActive: WritableSignal<boolean> = signal(false);
}