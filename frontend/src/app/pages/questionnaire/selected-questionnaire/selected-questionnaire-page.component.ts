import { Component, input } from "@angular/core";

@Component({
  selector: 'app-selected-questionnaire-page',
  templateUrl: './selected-questionnaire-page.component.html'
})
export class SelectedQuestionnairePageComponent {

  protected readonly questionnaireId = input.required();
}