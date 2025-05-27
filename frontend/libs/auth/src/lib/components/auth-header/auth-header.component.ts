import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'lib-auth-header',
  templateUrl: './auth-header.component.html',
  imports: [
    RouterLink,
    CommonModule
  ]
})
export class AuthHeaderComponent {

}