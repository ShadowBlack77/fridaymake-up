import { Component, inject, signal, WritableSignal } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { take } from "rxjs";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'lib-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ]
})
export class ResetPasswordFormComponent {

  private readonly _fromBuilder: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);

  protected readonly resetPasswordError: WritableSignal<string> = signal('');
  protected readonly isSubmitted: WritableSignal<boolean> = signal(false);

  protected readonly resetPasswordForm: FormGroup = this._fromBuilder.group({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    })
  });

  submitted(): void {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordError.set('');
      this.isSubmitted.set(true);

      this._authService.resetPassword(this.resetPasswordForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this.isSubmitted.set(false);
          this.resetPasswordForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);

          this.isSubmitted.set(false);
        }
      });
    }
  }
}