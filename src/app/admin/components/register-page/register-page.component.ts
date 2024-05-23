import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-register-doctor-dialog',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit{
  public form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required,this.phoneNumber()]],
  })
  public password:string = "";

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private snack: MatSnackBar,
              private settingsService: SettingsService,
              private router: Router) {
  }

  async ngOnInit() {
    this.password = await this.settingsService.getDoctorPassword();
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
      this.openSnackBar('Cont creat cu succes', 'OK');
    } catch (e) {
      this.openSnackBar('Există deja un cont cu acest email', 'OK');
    }
  }
}
