import { Component } from "@angular/core";
import { LoginFormComponent } from "@lib/auth";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  imports: [
    LoginFormComponent
  ]
})
export class LoginPageComponent {
  
}