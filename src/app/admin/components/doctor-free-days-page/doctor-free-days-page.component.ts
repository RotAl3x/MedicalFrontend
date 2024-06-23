import {Component, inject, OnInit} from '@angular/core';
import {IAppointment} from "../../models/appointment";
import {AppointmentService} from "../../services/appointment.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../models/login";

@Component({
  selector: 'app-doctor-free-days-page',
  templateUrl: './doctor-free-days-page.component.html',
  styleUrls: ['./doctor-free-days-page.component.scss']
})
export class DoctorFreeDaysPageComponent implements OnInit {

  doctorFreeDays: IAppointment[] = [];
  doctors: IUser[] = [];
  appointmentService = inject(AppointmentService);
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  public form = this.formBuilder.group({
    roomOrDeviceId: [null],
    applicationUserId: ['', [Validators.required]],
    start: [null, [Validators.required]],
    end: [new Date()],
    startDateForMessage: [null],
    medicalServiceId: [null],
    phone: [""],
    name: [""],
    diseaseId: [null],
    isDeleted: [false],
    isFreeDay: [false],
    isDoctorFreeDay: [true],
  })
  private snack = inject(MatSnackBar);

  async ngOnInit() {
    this.form.controls.start.disable();
    this.doctors = await this.authService.getUsersByRole("Doctor");
    this.form.controls.applicationUserId.valueChanges.subscribe(async value => {
      this.form.controls.start.enable();
      await this.getDoctorFreeDays(value ?? '');
    })
  }

  async getDoctorFreeDays(id: string) {
    this.doctorFreeDays = await this.appointmentService.getDoctorFreeDays(id);
  }

  disableAlreadyFreeDays = (date: Date | null): boolean => {
    let formatDate = (d: Date) => {
      let newDate = new Date(d);
      let getOffSet = newDate.getTimezoneOffset();
      let newDateTime = newDate.getTime();
      return new Date(newDateTime + getOffSet * 60 * 1000)
    }
    this.doctorFreeDays.forEach(d => {
      console.log(formatDate(d.start ?? new Date()).getTime() == date?.getTime());
    });
    return !this.doctorFreeDays.filter(d => new Date(d.start ?? new Date()).getTime() == date?.getTime()).length;
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action);
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
    await this.getDoctorFreeDays(this.form.controls.applicationUserId.value ?? '');
  }

  async onDelete(id: string) {
    try {
      await this.appointmentService.deleteAppointment(id);
      this.openSnackBar('Zi liberă ștearsă', 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
    await this.getDoctorFreeDays(this.form.controls.applicationUserId.value ?? '');
  }
}
