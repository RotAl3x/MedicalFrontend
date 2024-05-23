import {Component, Inject, inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TestimonialPersonService} from "../../../../services/testimonial-person.service";
import {ITestimonialPerson} from "../../../../models/testimonial-person";
import {FormBuilder, Validators} from "@angular/forms";
import {SettingsService} from "../../../services/settings.service";

@Component({
  selector: 'app-testimonial-upsert-dialog',
  templateUrl: './testimonial-upsert-dialog.component.html',
  styleUrls: ['./testimonial-upsert-dialog.component.scss']
})
export class TestimonialUpsertDialogComponent implements OnInit {
  public settingsService = inject(SettingsService);
  private snack = inject(MatSnackBar);
  private testimonialPersonService = inject(TestimonialPersonService);
  private formBuilder = inject(FormBuilder);
  public form = this.formBuilder.group({
    id: [crypto.randomUUID()],
    isDeleted: [false],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    photoName: ['', [Validators.required]],
  })

  constructor(
    public dialogRef: MatDialogRef<TestimonialUpsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITestimonialPerson | null,
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
      await this.testimonialPersonService.delete(this.form.controls.id.value);
      this.openSnackBar('Testimonial șters', 'OK');
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
        await this.testimonialPersonService.update(this.form.value) :
        await this.testimonialPersonService.create(this.form.value);
      this.openSnackBar(`Testimonial ${modified ? 'modificat' : 'adaugăt'}`, 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
    this.dialogRef.close(true);
  }
}
