import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'lib-auth-actions',
  templateUrl: './auth-actions.component.html',
  imports: [
    RouterLink,
    CommonModule
  ]
})
export class AuthActionsComponent {

  private readonly _authService: AuthService = inject(AuthService);

  protected readonly user$: Observable<User | null> = this._authService.user$;
}