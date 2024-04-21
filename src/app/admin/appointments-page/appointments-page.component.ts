import {Component, inject, OnInit} from '@angular/core';
import {AppointmentService} from "../services/appointment.service";
import {IAppointment} from "../models/appointment";
import {CalendarOptions, EventClickArg} from "@fullcalendar/core";
import timeGridPlugin from '@fullcalendar/timegrid'
import {combineLatest, map, Observable} from "rxjs";
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.scss']
})
export class AppointmentsPageComponent implements OnInit {

  private appointmentService = inject(AppointmentService);
  events: Observable<any> | undefined;
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

  handleDateClick(arg: EventClickArg) {
    console.log(arg.event._def);
    alert('date click! ');
  }

  async ngOnInit() {
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
}
