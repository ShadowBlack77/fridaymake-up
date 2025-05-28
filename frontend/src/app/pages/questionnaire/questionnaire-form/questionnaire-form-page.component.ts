import { Component } from "@angular/core";
import { ContactDetailsStepComponent } from "@lib/fridaymake-up/questionnaire";
import { StepComponent, StepperComponent } from "@lib/shared/stepper";

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form-page.component.html',
  imports: [
    StepperComponent,
    StepComponent,
    ContactDetailsStepComponent
  ]
})
export class QuestionnaireFormPageComponent {

  handleSubmit(): void {
    console.log('SUBMIT');
  }
}