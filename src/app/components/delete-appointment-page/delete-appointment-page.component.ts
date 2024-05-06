import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppointmentService} from "../../admin/services/appointment.service";

@Component({
  selector: 'app-delete-appointment-page',
  templateUrl: './delete-appointment-page.component.html',
  styleUrls: ['./delete-appointment-page.component.scss']
})
export class DeleteAppointmentPageComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private snack = inject(MatSnackBar);
  private appointmentService = inject(AppointmentService);
  private id = '';
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? "";
    })
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action);
  }

  async submit() {
    try {
      await this.appointmentService.deleteAppointment(this.id);
      this.openSnackBar('Programarea a fost anulată.', 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
  }
}
