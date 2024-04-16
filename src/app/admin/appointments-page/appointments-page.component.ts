import {Component, inject, OnInit} from '@angular/core';
import {AppointmentService} from "../services/appointment.service";
import {IAppointment} from "../models/appointment";

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.scss']
})
export class AppointmentsPageComponent implements OnInit{

  private appointmentService= inject(AppointmentService);
  appointments: IAppointment[] = [];
 async ngOnInit() {
   //this.appointments=this.appointmentService.getAllByRoomIdOrDoctorId()
    await this.appointmentService.connect();
    this.appointmentService.appointmentUpdated$().subscribe((appointment:IAppointment)=>this.appointments.push(appointment));
  }
}
