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

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.scss']
})
export class AppointmentsPageComponent implements OnInit {

  private appointmentService = inject(AppointmentService);
  private formBuilder= inject(FormBuilder);
  private roomOrDeviceService = inject(RoomOrDeviceService);
  private medicalServiceService = inject(MedicalServiceService);
  private diseaseService = inject(DiseaseService);
  private authService= inject(AuthService);

  events: Observable<any> | undefined;
  roomsOrDevices: IRoomOrDevice[]=[];
  medicalServices: IMedicalService[]=[]
  diseases: IDisease[]=[]
  doctorUsers: IUser[]=[]
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    eventClick: (arg) => this.handleDateClick(arg),
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
    start:['', [Validators.required]],
    medicalServiceId: ['', [Validators.required]],
    phone:['', [Validators.required,this.phoneNumber()]],
    diseaseId:['', [Validators.required]],
    isDeleted:[false],
  })

  handleDateClick(arg: EventClickArg) {
    console.log(arg.event._def);
    alert('date click! ');
  }

  async ngOnInit() {
    this.roomsOrDevices = await this.roomOrDeviceService.getAll();
    this.medicalServices = await this.medicalServiceService.getAll();
    this.diseases = await  this.diseaseService.getAll();
    this.doctorUsers = await  this.authService.getUsersByRole("Doctor");
    let getInitialAppointments = this.appointmentService.getAllByRoomIdOrDoctorId
    ("9c9c9d6e-c68a-40e3-a524-0a8ebaff0590", "d73da953-2e90-49b6-b0ac-5867b8d0ed6f");
    await this.appointmentService.connect();
    this.events = combineLatest([getInitialAppointments, this.appointmentService.appointmentUpdated$()]).pipe(
      map(([initialAppointments, newAppointment]) => {
        if (newAppointment) initialAppointments.push(newAppointment);
        return initialAppointments.map(a => {
          return {...a, title: a.phone}
        })
      })
    )
  }

  phoneNumber(): (control: AbstractControl) => { notMatch: string } | null {
    return (control: AbstractControl) => {
      const hasError = !control.value.match('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$');
      return hasError? {notMatch: "not-match"}:  null;
    };
  }
}
