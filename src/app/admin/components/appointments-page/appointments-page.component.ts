import {Component, inject, OnInit} from '@angular/core';
import {AppointmentService} from "../../services/appointment.service";
import {IAppointment} from "../../models/appointment";
import {CalendarOptions, EventClickArg} from "@fullcalendar/core";
import timeGridPlugin from '@fullcalendar/timegrid'
import {combineLatest, map, Observable} from "rxjs";
import interactionPlugin from '@fullcalendar/interaction';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {IRoomOrDevice} from "../../models/room-or-device";
import {IMedicalService} from "../../models/medical-service";
import {IDisease} from "../../models/disease";
import {IUser} from "../../../models/login";
import {RoomOrDeviceService} from "../../services/room-or-device.service";
import {MedicalServiceService} from "../../services/medical-service.service";
import {DiseaseService} from "../../services/disease.service";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import roLocale from '@fullcalendar/core/locales/ro';
import {MatDialog} from "@angular/material/dialog";
import {DialogAppointmentComponent} from "../dialog-appointment/dialog-appointment.component";

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.scss']
})
export class AppointmentsPageComponent implements OnInit {

  private appointmentService = inject(AppointmentService);
  private formBuilder = inject(FormBuilder);
  private roomOrDeviceService = inject(RoomOrDeviceService);
  private medicalServiceService = inject(MedicalServiceService);
  private diseaseService = inject(DiseaseService);
  private authService = inject(AuthService);
  private snack = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  events: Observable<any> | undefined;
  roomsOrDevices: IRoomOrDevice[] = [];
  medicalServices: IMedicalService[] = []
  diseases: IDisease[] = []
  doctorUsers: IUser[] = []
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

  constructor() {
  }

  public form = this.formBuilder.group({
    roomOrDeviceId: ['', [Validators.required]],
    applicationUserId: ['', [Validators.required]],
    start: [new Date(), [Validators.required]],
    end: [new Date()],
    medicalServiceId: ['', [Validators.required]],
    phone: ['', [Validators.required, this.phoneNumber()]],
    diseaseId: ['', [Validators.required]],
    isDeleted: [false],
  })

  handleDateClick(arg: EventClickArg) {
    console.log(arg.event)
    this.dialog.open(DialogAppointmentComponent, {
      data: arg.event,
    });
  }

  async ngOnInit() {
    this.roomsOrDevices = await this.roomOrDeviceService.getAll();
    this.medicalServices = await this.medicalServiceService.getAll();
    this.diseases = await this.diseaseService.getAll();
    this.doctorUsers = await this.authService.getUsersByRole("Doctor");
    let getInitialAppointments = this.appointmentService.getAllByRoomIdOrDoctorId
    ("9c9c9d6e-c68a-40e3-a524-0a8ebaff0590", "d73da953-2e90-49b6-b0ac-5867b8d0ed6f");
    await this.appointmentService.connect();
    this.events = combineLatest([getInitialAppointments, this.appointmentService.appointmentUpdated$()]).pipe(
      map(([initialAppointments, newAppointment]) => {
        if (newAppointment) {
          if (newAppointment.isDeleted) {
            let indexDeleted = initialAppointments.findIndex(a => a.id == newAppointment.id)
            initialAppointments.splice(indexDeleted, 1)
          } else {
            initialAppointments.push(newAppointment);
          }
        }
        return initialAppointments.map(a => {
          return {...a, title: a.phone, color: this.mapColorToEvent(a)}
        })
      })
    )
  }

  mapColorToEvent(appointment: IAppointment) {
    if ((appointment.roomOrDeviceId == this.form.controls.roomOrDeviceId.value)
      && (appointment.applicationUserId == this.form.controls.applicationUserId.value)) {
      return "#000000";
    }
    if ((appointment.roomOrDeviceId == this.form.controls.roomOrDeviceId.value)) {
      return "#034000";
    }
    if ((appointment.roomOrDeviceId == this.form.controls.roomOrDeviceId.value)
      && (appointment.applicationUserId == this.form.controls.applicationUserId.value)) {
      return "#000034";
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

  async submit(e: Event) {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      this.openSnackBar('Verifică formularul', 'OK');
      return;
    }
    try {
      let minutesToAdd = this.medicalServices.find(m => m.id == this.form.controls['medicalServiceId'].value)?.duration;
      let end = this.form.controls.start.value;
      end?.setMinutes(end?.getMinutes() + (minutesToAdd ?? 0));
      this.form.controls['end'].setValue(end);
      await this.appointmentService.addAppointment(this.form.value);
      this.openSnackBar('Programare adăugată', 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
  }
}
