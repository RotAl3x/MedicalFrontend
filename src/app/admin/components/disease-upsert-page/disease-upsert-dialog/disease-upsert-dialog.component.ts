import {Component, Inject, inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DiseaseService} from "../../../services/disease.service";
import {IDisease} from "../../../models/disease";

@Component({
  selector: 'app-disease-upsert-dialog',
  templateUrl: './disease-upsert-dialog.component.html',
  styleUrls: ['./disease-upsert-dialog.component.scss']
})
export class DiseaseUpsertDialogComponent implements OnInit {
  private snack = inject(MatSnackBar);
  private diseaseService = inject(DiseaseService);
  private formBuilder = inject(FormBuilder);
  public form = this.formBuilder.group({
    id: [crypto.randomUUID()],
    isDeleted: [false],
    name: ['', [Validators.required]],
  })

  constructor(
    public dialogRef: MatDialogRef<DiseaseUpsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDisease | null,
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
      await this.diseaseService.delete(this.form.controls.id.value);
      this.openSnackBar('Boală șters', 'OK');
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
        await this.diseaseService.update(this.form.value) :
        await this.diseaseService.create(this.form.value);
      this.openSnackBar(`Boală ${modified ? 'modificat' : 'adaugăt'}`, 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
    this.dialogRef.close(true);
  }
}
