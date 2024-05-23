import {Component, Inject, inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MedicalService} from "../../../services/medical.service";
import {IMedicalService} from "../../../models/medical-service";

@Component({
  selector: 'app-medical-service-upsert-dialog',
  templateUrl: './medical-service-upsert-dialog.component.html',
  styleUrls: ['./medical-service-upsert-dialog.component.scss']
})
export class MedicalServiceUpsertDialogComponent implements OnInit {
  medicalService = inject(MedicalService);
  private snack = inject(MatSnackBar);
  private formBuilder = inject(FormBuilder);
  public form = this.formBuilder.group({
    id: [crypto.randomUUID()],
    isDeleted: [false],
    name: ['', [Validators.required]],
    duration: [0, [Validators.required]],
  })

  constructor(
    public dialogRef: MatDialogRef<MedicalServiceUpsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMedicalService | null,
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

  async onDelete() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.openSnackBar('Verifică formularul', 'OK');
      return;
    }
    try {
      await this.medicalService.delete(this.form.controls.id.value);
      this.openSnackBar('Serviciu medical șters', 'OK');
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
        await this.medicalService.update(this.form.value) :
        await this.medicalService.create(this.form.value);
      this.openSnackBar(`Serviciu medical ${modified ? 'modificat' : 'adaugăt'}`, 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
    this.dialogRef.close(true);
  }
}
