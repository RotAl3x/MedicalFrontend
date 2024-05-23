import {Component, Inject, inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {SettingsService} from "../../../services/settings.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DoctorService} from "../../../../services/doctor.service";
import {IDoctor} from "../../../../models/doctor";

@Component({
  selector: 'app-doctor-upsert-dialog',
  templateUrl: './doctor-upsert-dialog.component.html',
  styleUrls: ['./doctor-upsert-dialog.component.scss']
})
export class DoctorUpsertDialogComponent implements OnInit {
  public settingsService = inject(SettingsService);
  private snack = inject(MatSnackBar);
  private doctorService = inject(DoctorService);
  private formBuilder = inject(FormBuilder);
  public form = this.formBuilder.group({
    id: [crypto.randomUUID()],
    isDeleted: [false],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    photoName: ['', [Validators.required]],
  })

  constructor(
    public dialogRef: MatDialogRef<DoctorUpsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDoctor | null,
  ) {
  }

  ngOnInit() {
    if (this.data) { // @ts-ignore
      this.form.patchValue(this.data);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action);
  }

  async saveFile(e: any) {
    let file: File = e.target.files[0];
    let formDate = new FormData();
    formDate.append('file', file);
    let name = await this.settingsService.addPhoto(formDate);
    this.form.controls.photoName.setValue(name);
  }

  async onDelete() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.openSnackBar('Verifică formularul', 'OK');
      return;
    }
    try {
      await this.doctorService.delete(this.form.controls.id.value);
      this.openSnackBar('Doctor șters', 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
    this.dialogRef.close(true);
  }

  async onSave(modified: boolean) {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.openSnackBar('Verifică formularul', 'OK');
      return;
    }
    try {
      modified ?
        await this.doctorService.update(this.form.value) :
        await this.doctorService.create(this.form.value);
      this.openSnackBar(`Doctor ${modified ? 'modificat' : 'adaugăt'}`, 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
    this.dialogRef.close(true);
  }
}
