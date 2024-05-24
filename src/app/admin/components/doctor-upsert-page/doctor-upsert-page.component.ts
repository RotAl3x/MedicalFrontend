import {Component, inject, OnInit} from '@angular/core';
import {IDoctor} from "../../../models/doctor";
import {DoctorService} from "../../../services/doctor.service";
import {MatDialog} from "@angular/material/dialog";
import {DoctorUpsertDialogComponent} from "./doctor-upsert-dialog/doctor-upsert-dialog.component";

@Component({
  selector: 'app-doctor-upsert-page',
  templateUrl: './doctor-upsert-page.component.html',
  styleUrls: ['./doctor-upsert-page.component.scss']
})
export class DoctorUpsertPageComponent implements OnInit {
  doctors: IDoctor[] = []
  doctorService = inject(DoctorService);
  private dialog = inject(MatDialog);

  async ngOnInit() {
    await this.getAllDoctors()
  }

  async getAllDoctors() {
    this.doctors = await this.doctorService.getAll();
  }

  openDialog(doctor?: IDoctor) {
    const dialogRef = this.dialog.open(DoctorUpsertDialogComponent, {
      data: doctor,
    })
    dialogRef.afterClosed().subscribe(async result => {
      if (result) await this.getAllDoctors();
    });
  }
}
