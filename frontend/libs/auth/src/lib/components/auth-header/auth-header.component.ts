import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";

@Component({
  selector: 'lib-auth-header',
  templateUrl: './auth-header.component.html',
  imports: [
    RouterLink,
    CommonModule
  ]
})
export class AuthHeaderComponent {

  private readonly _authService: AuthService = inject(AuthService);

  protected readonly user$: Observable<User | null> = this._authService.user$;
}