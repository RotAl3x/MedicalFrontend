import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private snack: MatSnackBar,
              private router: Router) {
  }

  async ngOnInit() {
    // const session = await this.authService.getSession();
    // if (session) {
    //   await this.router.navigate(['home']);
    // }
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action);
  }

  async submit(e: Event) {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.openSnackBar('Verifică formularul', 'OK');
      return;
    }
    try {
      await this.authService.login(this.form.value);
      this.openSnackBar('Te-ai logat cu succes', 'OK');
      await new Promise(f => setTimeout(f, 500));
      await this.router.navigate(['/admin/home']);
    } catch (e) {
      this.openSnackBar('Mail-ul sau parola incorectă', 'OK');
    }
  }
}
