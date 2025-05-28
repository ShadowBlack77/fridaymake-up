import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { take } from "rxjs";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'lib-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ]
})
export class ResetPasswordFormComponent {

  private readonly _fromBuilder: FormBuilder = inject(FormBuilder);
  private readonly _authService: AuthService = inject(AuthService);

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
      this._authService.resetPassword(this.resetPasswordForm.getRawValue()).pipe(
        take(1)
      ).subscribe();
    }
  }
}