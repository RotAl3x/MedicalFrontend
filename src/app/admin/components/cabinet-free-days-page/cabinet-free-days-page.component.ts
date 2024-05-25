import {Component, inject, OnInit} from '@angular/core';
import {IAppointment} from "../../models/appointment";
import {AppointmentService} from "../../services/appointment.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cabinet-free-days-page',
  templateUrl: './cabinet-free-days-page.component.html',
  styleUrls: ['./cabinet-free-days-page.component.scss']
})
export class CabinetFreeDaysPageComponent implements OnInit {

  cabinetFreeDays: IAppointment[] = [];
  appointmentService = inject(AppointmentService);
  private snack = inject(MatSnackBar);
  formBuilder = inject(FormBuilder);

  public form = this.formBuilder.group({
    roomOrDeviceId: [null],
    applicationUserId: [null],
    start: [null, [Validators.required]],
    end: [new Date()],
    startDateForMessage: [null],
    medicalServiceId: [null],
    phone: [""],
    name: [""],
    diseaseId: [null],
    isDeleted: [false],
    isFreeDay: [true],
    isDoctorFreeDay: [false],
  })

  async ngOnInit() {
    await this.getCabinetFreeDays();
  }

  async getCabinetFreeDays() {
    this.cabinetFreeDays = await this.appointmentService.getCabinetFreeDays();
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action);
  }

  disableAlreadyFreeDays = (date: Date | null): boolean => {
    return !this.cabinetFreeDays.filter(c => new Date(c.start ?? new Date()).getTime() == date?.getTime()).length;
  }

  async submit() {
    this.form.markAllAsTouched();
    console.log(this.form.value);
    if (!this.form.valid) {
      this.openSnackBar('Verifică formularul', 'OK');
      return;
    }
    let addOneDayOnStartDate = new Date(this.form.controls.start.value ?? 0);
    addOneDayOnStartDate.setDate(addOneDayOnStartDate.getDate() + 1);
    this.form.controls.end.setValue(addOneDayOnStartDate);
    try {
      await this.appointmentService.addAppointment(this.form.value);
      this.openSnackBar(`Zi liberă adăugată`, 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
    await this.getCabinetFreeDays();
  }

  async onDelete(id: string) {
    try {
      await this.appointmentService.deleteAppointment(id);
      this.openSnackBar('Zi liberă ștearsă', 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
    await this.getCabinetFreeDays();
  }
}
