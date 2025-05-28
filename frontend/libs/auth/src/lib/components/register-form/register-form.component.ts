import { Component, inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { take } from "rxjs";

@Component({
  selector: 'lib-register-form',
  templateUrl: './register-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ]
})
export class RegisterFormComponent {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);

  protected readonly registerForm: FormGroup = this._formBuilder.group({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
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
    if (this.registerForm.valid) {
      this._authService.register(this.registerForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this._router.navigateByUrl('/auth/login');
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}