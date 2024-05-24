import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventDef, EventImpl} from "@fullcalendar/core/internal";
import {AppointmentService} from "../../services/appointment.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dialog-appointment',
  templateUrl: './dialog-appointment.component.html',
  styleUrls: ['./dialog-appointment.component.scss']
})
export class DialogAppointmentComponent {
  eventDef: EventDef;
  private snack = inject(MatSnackBar);

  constructor(
    public dialogRef: MatDialogRef<DialogAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventImpl,
    private appointmentService: AppointmentService
  ) {
    this.eventDef = data._def;
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action);
  }

  async onDelete() {
    try {
      await this.appointmentService.deleteAppointment(this.eventDef.publicId);
      this.openSnackBar('Programare ștearsă', 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
    this.dialogRef.close();
  }
}
