import {Component, inject, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {ISettings} from "../../../models/settings";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  public settingsService = inject(SettingsService);
  settings: ISettings | undefined;
  private snack = inject(MatSnackBar);
  private formBuilder = inject(FormBuilder);
  public form = this.formBuilder.group({
    id: [crypto.randomUUID()],
    isDeleted: [false],
    lat: [0, [Validators.required]],
    lng: [0, [Validators.required]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    linkFacebook: ['', [Validators.required]],
    linkInstagram: ['', [Validators.required]],
    workingHours: ['', [Validators.required]],
  })

  async ngOnInit() {
    this.settings = await this.settingsService.getSettings();
    if (this.settings) { // @ts-ignore
      this.form.patchValue(this.settings);
    }
  }


  openSnackBar(message: string, action: string) {
    this.snack.open(message, action);
  }


  async onSave() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.openSnackBar('Verifică formularul', 'OK');
      return;
    }
    let modified = !!this.settings;
    try {
      modified ?
        await this.settingsService.updateSettings(this.form.value) :
        await this.settingsService.createSettings(this.form.value);
      this.openSnackBar(`Setările au fost modificate`, 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
  }
}
