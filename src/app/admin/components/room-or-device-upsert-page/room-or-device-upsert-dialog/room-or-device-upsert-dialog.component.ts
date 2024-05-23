import {Component, Inject, inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomOrDeviceService} from "../../../services/room-or-device.service";
import {IRoomOrDevice} from "../../../models/room-or-device";

@Component({
  selector: 'app-room-or-device-upsert-dialog',
  templateUrl: './room-or-device-upsert-dialog.component.html',
  styleUrls: ['./room-or-device-upsert-dialog.component.scss']
})
export class RoomOrDeviceUpsertDialogComponent implements OnInit{
  private snack = inject(MatSnackBar);
  private roomOrDeviceService = inject(RoomOrDeviceService);
  private formBuilder = inject(FormBuilder);
  public form = this.formBuilder.group({
    id: [crypto.randomUUID()],
    isDeleted: [false],
    name: ['', [Validators.required]],
  })

  constructor(
    public dialogRef: MatDialogRef<RoomOrDeviceUpsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRoomOrDevice | null,
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
      await this.roomOrDeviceService.delete(this.form.controls.id.value);
      this.openSnackBar('Cameră/aparat șters', 'OK');
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
        await this.roomOrDeviceService.update(this.form.value) :
        await this.roomOrDeviceService.create(this.form.value);
      this.openSnackBar(`Cameră/aparat ${modified ? 'modificat' : 'adaugăt'}`, 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
    this.dialogRef.close(true);
  }
}
