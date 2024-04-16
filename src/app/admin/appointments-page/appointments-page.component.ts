import {Component, inject, OnInit} from '@angular/core';
import {AppointmentService} from "../services/appointment.service";

@Component({
  selector: 'app-appointments-page',
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.scss']
})
export class AppointmentsPageComponent implements OnInit{

  private appointmentService= inject(AppointmentService);

 async ngOnInit() {
    await this.appointmentService.connect();
    //await this.appointmentService.sendMessage("Test");
    await new Promise(f => setTimeout(f, 1000));
    //this.appointmentService.closeConnection();
  }

  test(){
    this.appointmentService.sendMessage("Test");
  }
}
