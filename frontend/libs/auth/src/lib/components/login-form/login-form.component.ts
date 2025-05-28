import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { take } from "rxjs";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'lib-login-form',
  templateUrl: './login-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ]
})
export class LoginFormComponent {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);

  protected readonly loginForm: FormGroup = this._formBuilder.group({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })
  });

  submitted(): void {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this._router.navigateByUrl('/');
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}