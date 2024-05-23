import {Component, inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MedicalService} from "../../services/medical.service";
import {
  MedicalServiceUpsertDialogComponent
} from "./medical-service-upsert-dialog/medical-service-upsert-dialog.component";
import {IMedicalService} from "../../models/medical-service";

@Component({
  selector: 'app-medical-service-upsert-page',
  templateUrl: './medical-service-upsert-page.component.html',
  styleUrls: ['./medical-service-upsert-page.component.scss']
})
export class MedicalServiceUpsertPageComponent implements OnInit {

  medicalServices: IMedicalService[] = [];
  medicalService = inject(MedicalService);
  private dialog = inject(MatDialog);

  async ngOnInit() {
    await this.getAllTestimonialPerson();
  }

  async getAllTestimonialPerson() {
    this.medicalServices = await this.medicalService.getAll();
  }

  openDialog(medicalServiceData?: IMedicalService) {
    const dialogRef = this.dialog.open(MedicalServiceUpsertDialogComponent, {
      data: medicalServiceData,
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) await this.getAllTestimonialPerson();
    });
  }
}
