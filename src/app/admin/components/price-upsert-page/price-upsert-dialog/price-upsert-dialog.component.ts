import {Component, Inject, inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {PriceService} from "../../../../services/price.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IPrice} from "../../../../models/price";

@Component({
  selector: 'app-price-upsert-dialog',
  templateUrl: './price-upsert-dialog.component.html',
  styleUrls: ['./price-upsert-dialog.component.scss']
})
export class PriceUpsertDialogComponent implements OnInit {
  private snack = inject(MatSnackBar);
  private priceService = inject(PriceService);
  private formBuilder = inject(FormBuilder);
  public form = this.formBuilder.group({
    id: [crypto.randomUUID()],
    isDeleted: [false],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    priceForOne: [0, [Validators.required]],
    numberOfMeets: [0, [Validators.required]],
    priceForAllMeets: [0, [Validators.required]],
  })

  constructor(
    public dialogRef: MatDialogRef<PriceUpsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPrice | null,
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
      await this.priceService.delete(this.form.controls.id.value);
      this.openSnackBar('Ofertă ștearsă', 'OK');
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
        await this.priceService.update(this.form.value) :
        await this.priceService.create(this.form.value);
      this.openSnackBar(`Ofertă ${modified ? 'modificată' : 'adaugătă'}`, 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
    this.dialogRef.close(true);
  }
}
