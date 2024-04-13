import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  public form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required,this.phoneNumber()]],
  })

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private snack: MatSnackBar,
              private router: Router) {
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action);
  }

  phoneNumber(): (control: AbstractControl) => { notMatch: string } | null {
    return (control: AbstractControl) => {
      const hasError = !control.value.match('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$');
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
      await this.authService.register(this.form.value);
      this.openSnackBar('Te-ai  înregistrat cu succes', 'OK');
      await this.router.navigate(['/login']);
    } catch (e) {
      this.openSnackBar('Există deja un cont cu acest email', 'OK');
    }
  }
}
