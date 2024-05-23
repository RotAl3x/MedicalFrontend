import {Component, inject, OnInit} from '@angular/core';
import {AppointmentService} from "../../services/appointment.service";
import {IAppointment} from "../../models/appointment";
import {CalendarOptions, EventClickArg} from "@fullcalendar/core";
import timeGridPlugin from '@fullcalendar/timegrid'
import {combineLatest, firstValueFrom, map, Observable} from "rxjs";
import interactionPlugin from '@fullcalendar/interaction';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {IRoomOrDevice} from "../../models/room-or-device";
import {IMedicalService} from "../../models/medical-service";
import {IDisease} from "../../models/disease";
import {IUser} from "../../../models/login";
import {RoomOrDeviceService} from "../../services/room-or-device.service";
import {MedicalService} from "../../services/medical.service";
import {DiseaseService} from "../../services/disease.service";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import roLocale from '@fullcalendar/core/locales/ro';
import {MatDialog} from "@angular/material/dialog";
import {DialogAppointmentComponent} from "../dialog-appointment/dialog-appointment.component";
import {DialogAppointmentOverlapComponent} from "../dialog-appointment-overlap/dialog-appointment-overlap.component";

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.scss']
})
export class AppointmentsPageComponent implements OnInit {

  events: Observable<any> | undefined;
  roomsOrDevices: Array<IRoomOrDevice> = [];
  medicalServices: Array<IMedicalService> = []
  diseases: IDisease[] = []
  doctorUsers: Array<IUser> = []
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    eventClick: (arg) => this.handleDateClick(arg),
    locale: roLocale,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    plugins: [timeGridPlugin, interactionPlugin],
  };
  private appointmentService = inject(AppointmentService);
  private formBuilder = inject(FormBuilder);
  public form = this.formBuilder.group({
    roomOrDeviceId: [null],
    applicationUserId: [null],
    start: [new Date(), [Validators.required]],
    end: [new Date()],
    startDateForMessage: [new Date()],
    medicalServiceId: ['', [Validators.required]],
    phone: ['', [Validators.required, this.phoneNumber()]],
    diseaseId: ['', [Validators.required]],
    isDeleted: [false],
    isFreeDay: [false],
    isDoctorFreeDay: [false],
  })
  private roomOrDeviceService = inject(RoomOrDeviceService);
  private medicalServiceService = inject(MedicalService);
  private diseaseService = inject(DiseaseService);
  private authService = inject(AuthService);
  private snack = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  constructor() {
  }

  handleDateClick(arg: EventClickArg) {
    this.dialog.open(DialogAppointmentComponent, {
      data: arg.event,
    });
  }

  async ngOnInit() {
    // @ts-ignore
    this.form.controls.start.setValue('');
    this.roomsOrDevices = await this.roomOrDeviceService.getAll();
    let emptyRoomOrDevice: IRoomOrDevice = {
      name: '',
      id: '',
      isDeleted: false,
    };
    this.roomsOrDevices.push(emptyRoomOrDevice);
    this.medicalServices = await this.medicalServiceService.getAll();
    this.diseases = await this.diseaseService.getAll();
    this.doctorUsers = await this.authService.getUsersByRole("Doctor");
    let emptyDoctorUser: IUser = {
      id: '',
      firstName: '',
      lastName: '',
    }
    this.doctorUsers.push(emptyDoctorUser);
    await this.appointmentService.connect();
    let prevApplicationUserId: null | undefined = this.form.controls.applicationUserId.value;
    let prevRoomOrDeviceId: null | undefined = this.form.controls.roomOrDeviceId.value;
    this.form.valueChanges.subscribe(async value => {
      if (value.applicationUserId != prevApplicationUserId || value.roomOrDeviceId != prevRoomOrDeviceId) {
        prevApplicationUserId = value.applicationUserId;
        prevRoomOrDeviceId = value.roomOrDeviceId;
        let getInitialAppointments = this.appointmentService.getAllByRoomIdOrDoctorId
        (value.roomOrDeviceId ?? '', value.applicationUserId ?? '');
        this.events = combineLatest([getInitialAppointments, this.appointmentService.appointmentUpdated$()]).pipe(
          map(([initialAppointments, newAppointment]) => {
            if (newAppointment) {
              if (newAppointment.isDeleted) {
                let indexDeleted = initialAppointments.findIndex(a => a.id == newAppointment.id)
                initialAppointments.splice(indexDeleted, 1)
              } else {
                if (newAppointment.roomOrDeviceId == this.form.controls.roomOrDeviceId.value
                  || newAppointment.applicationUserId == this.form.controls.applicationUserId.value
                  || newAppointment.isFree)
                  initialAppointments.push(newAppointment);
              }
            }
            return initialAppointments.map(a => {
              return {...a, title: a.phone, color: this.mapColorToEvent(a)}
            })
          })
        )
      }
    })
  }

  mapColorToEvent(appointment: IAppointment) {
    if (appointment.isFree) {
      return "#FF0000";
    }
    if (appointment.isDoctorFree) {
      return "#FF66B2";
    }
    if ((appointment.roomOrDeviceId == this.form.controls.roomOrDeviceId.value)
      && (appointment.applicationUserId == this.form.controls.applicationUserId.value)) {
      return "#00FF00";
    }
    if ((appointment.roomOrDeviceId == this.form.controls.roomOrDeviceId.value)) {
      return "#0000FF";
    }
    if (appointment.applicationUserId == this.form.controls.applicationUserId.value) {
      return "#FF8000";
    }
    return "#000000"
  }

  phoneNumber(): (control: AbstractControl) => { notMatch: string } | null {
    return (control: AbstractControl) => {
      const hasError = !control.value.match('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$');
      return hasError ? {notMatch: "not-match"} : null;
    };
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action);
  }

  isOccupied(oldStart: Date, oldEnd: Date, newStart: Date, newEnd: Date) {
    return ((oldStart <= newStart) && (newStart < oldEnd)) ||
      ((oldStart < newEnd) && (newEnd <= oldEnd)) ||
      ((oldStart >= newStart) && (newEnd >= oldEnd));
  }

  async isNewAppointmentOverlapAnOlderAppointment(appointment: Partial<IAppointment>) {
    if (this.events) {
      let events: IAppointment[] = await firstValueFrom(this.events);
      let occupied = events.find(e => this.isOccupied(new Date(e.start ?? 0), new Date(e.end ?? 0),
        appointment.start ?? new Date(), appointment.end ?? new Date()));
      if (occupied) return true;
    }
    return false;
  }

  async submit() {
    this.form.controls.roomOrDeviceId.addValidators(Validators.required);
    this.form.controls.roomOrDeviceId.updateValueAndValidity();
    this.form.controls.applicationUserId.addValidators(Validators.required);
    this.form.controls.applicationUserId.updateValueAndValidity();
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.openSnackBar('Verifică formularul', 'OK');
      return;
    }
    let minutesToAdd = this.medicalServices.find(m => m.id == this.form.controls['medicalServiceId'].value)?.duration;
    let end = new Date(this.form.controls.start.value ?? 0);
    end?.setMinutes(end?.getMinutes() + (minutesToAdd ?? 0));
    this.form.controls['end'].setValue(end);
    var getOffset = this.form.controls.start.value?.getTimezoneOffset() ?? 0;
    this.form.controls['startDateForMessage'].setValue(new Date((this.form.controls.start.value?.getTime() ?? 0) - getOffset * 60 * 1000));

    if (!this.form.controls['phone'].value?.includes("+")) {
      let phoneRomanianSuffix = "+4" + this.form.controls['phone'].value
      this.form.controls['phone'].setValue(phoneRomanianSuffix);
    }
    if (await this.isNewAppointmentOverlapAnOlderAppointment(this.form.value)) {
      const dialogRef = this.dialog.open(DialogAppointmentOverlapComponent);
      dialogRef.afterClosed().subscribe(async result => {
        if (result) await this.tryToAddAppointment();
      });
    } else {
      await this.tryToAddAppointment();
    }
  }

  async tryToAddAppointment() {
    try {
      await this.appointmentService.addAppointment(this.form.value);
      this.openSnackBar('Programare adăugată', 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
  }
}
