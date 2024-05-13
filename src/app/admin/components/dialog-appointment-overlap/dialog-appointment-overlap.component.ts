import {Component, inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-appointment-overlap',
  templateUrl: './dialog-appointment-overlap.component.html',
  styleUrls: ['./dialog-appointment-overlap.component.scss']
})
export class DialogAppointmentOverlapComponent {
  dialogRef= inject(MatDialogRef<DialogAppointmentOverlapComponent>);

  closeNo(){
    this.dialogRef.close(false);
  }

  closeYes(){
    this.dialogRef.close(true);
  }
}
