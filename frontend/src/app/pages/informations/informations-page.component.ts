import { Component } from "@angular/core";
import { SkinTypesListComponent } from "@lib/fridaymake-up/informations";
import { FooterComponent } from "@lib/shared/footer";

@Component({
  selector: 'app-informations-page',
  templateUrl: './informations-page.component.html',
  imports: [
    FooterComponent,
    SkinTypesListComponent
  ]
})
export class InformationsPageComponent {}