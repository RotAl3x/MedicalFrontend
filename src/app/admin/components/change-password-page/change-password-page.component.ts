import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss']
})
export class ChangePasswordPageComponent {
  private formBuilder = inject(FormBuilder);
  private snack = inject(MatSnackBar);
  private authService = inject(AuthService);

  public form = this.formBuilder.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, this.matchPassword()]]
  })

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action);
  }

  matchPassword(): (control: AbstractControl) => { notMatch: string } | null {
    return (control: AbstractControl) => {
      const hasError = control?.value ? control?.value?.toString() !== this.form.controls.newPassword.value : null;
      return hasError? {notMatch: "not-match"}:  null;
    };
  }

  async submit(e: Event) {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.openSnackBar('Verifică formularul', 'OK');
      return;
    }
    try {
      await this.authService.changePassword(this.form.value);
      this.openSnackBar('Parola a fost schimbată cu succes!', 'OK');

    } catch (e: any) {
      this.openSnackBar(e.error ?? "Eroare", 'OK');
    }
  }
}
