import { Component } from "@angular/core";
import { AllergyStepComponent, ContactDetailsStepComponent, CreamStepComponent, DateStepComponent, DiseaseStepComponent, HairdoStepComponent, IngredientsStepComponent, MakeUpLikeStepComponent, MakeUpStepComponent, PoresStepComponent, SummaryStepComponent, UseAppearanceStepComponent } from "@lib/fridaymake-up/questionnaire";
import { FooterComponent } from "@lib/shared/footer";
import { StepComponent, StepperComponent } from "@lib/shared/stepper";

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form-page.component.html',
  imports: [
    StepperComponent,
    StepComponent,
    ContactDetailsStepComponent,
    AllergyStepComponent,
    CreamStepComponent,
    DateStepComponent,
    DiseaseStepComponent,
    HairdoStepComponent,
    IngredientsStepComponent,
    MakeUpLikeStepComponent,
    MakeUpStepComponent,
    PoresStepComponent,
    SummaryStepComponent,
    UseAppearanceStepComponent,
    FooterComponent
  ]
})
export class QuestionnaireFormPageComponent {

  handleSubmit(): void {
    console.log('SUBMIT');
  }
}