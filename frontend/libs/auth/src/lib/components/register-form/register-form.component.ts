import { Component, inject, signal, WritableSignal } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { take } from "rxjs";
import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'lib-register-form',
  templateUrl: './register-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ]
})
export class RegisterFormComponent {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);

  protected readonly registerError: WritableSignal<string> = signal('');
  protected readonly isSubmitted: WritableSignal<boolean> = signal(false);

  protected readonly registerForm: FormGroup = this._formBuilder.group({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
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
        Validators.required,
        Validators.minLength(8)
      ]
    })
  });

  submitted(): void {
    if (this.registerForm.valid) {
      this.registerError.set('');
      this.isSubmitted.set(true);

      this._authService.register(this.registerForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this.isSubmitted.set(false);
          this._router.navigateByUrl('/auth/login');
        },
        error: (error: HttpErrorResponse) => {
          this.registerError.set(error.error.message === "The email address is already in use by another account." ? 'Email jest już zajęty' : error.error.message);
          this.isSubmitted.set(false);
        }
      });
    }
  }
}