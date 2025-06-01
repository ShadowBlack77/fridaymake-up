import { Component, input, InputSignal } from "@angular/core";
import { AllergyStepComponent, ContactDetailsStepComponent, CreamStepComponent, DateStepComponent, DiseaseStepComponent, HairdoStepComponent, IngredientsStepComponent, MakeUpLikeStepComponent, MakeUpStepComponent, PoresStepComponent, SummaryStepComponent, UseAppearanceStepComponent } from "@lib/fridaymake-up/questionnaire";
import { StepperWrapperComponent } from "@lib/fridaymake-up/stepper";
import { FooterComponent } from "@lib/shared/footer";
import { StepComponent, StepperComponent } from "@lib/shared/stepper";

@Component({
  selector: 'app-selected-questionnaire-page',
  templateUrl: './selected-questionnaire-page.component.html',
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
    FooterComponent,
    StepperWrapperComponent
  ]
})
export class SelectedQuestionnairePageComponent {

  protected readonly questionnaireId: InputSignal<string | undefined> = input.required();
}