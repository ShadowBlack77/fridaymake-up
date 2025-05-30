import { Component } from "@angular/core";
import { AccountInformationsComponent } from "@lib/auth";
import { UserSavedQuestionnaireComponent } from "@lib/fridaymake-up/questionnaire";
import { FooterComponent } from "@lib/shared/footer";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  imports: [
    FooterComponent,
    UserSavedQuestionnaireComponent,
    AccountInformationsComponent
  ]
})
export class ProfilePageComponent {}