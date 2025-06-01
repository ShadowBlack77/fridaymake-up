import { Component, inject, signal, WritableSignal } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { take } from "rxjs";
import { Router, RouterLink } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'lib-login-form',
  templateUrl: './login-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ]
})
export class LoginFormComponent {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);

  protected readonly loginError: WritableSignal<string> = signal('');
  protected readonly isSubmitted: WritableSignal<boolean> = signal(false);

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
      this.loginError.set('');
      this.isSubmitted.set(true);
      
      this._authService.login(this.loginForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this.isSubmitted.set(false);
          this._router.navigateByUrl('/');
        },
        error: (error: HttpErrorResponse) => {
          this.loginError.set(error.error.message === 'Invalid credentials' ? 'Niepoprawny login lub hasło' : error.error.message);
          this.isSubmitted.set(false);
        }
      });
    }
  }
}