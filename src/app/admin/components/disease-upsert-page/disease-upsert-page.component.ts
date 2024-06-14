import {Component, inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {IDisease} from "../../models/disease";
import {DiseaseService} from "../../services/disease.service";
import {DiseaseUpsertDialogComponent} from "./disease-upsert-dialog/disease-upsert-dialog.component";

@Component({
  selector: 'app-disease-upsert-page',
  templateUrl: './disease-upsert-page.component.html',
  styleUrls: ['./disease-upsert-page.component.scss']
})
export class DiseaseUpsertPageComponent implements OnInit{
  diseases: IDisease[] = [];
  diseaseService = inject(DiseaseService);
  private dialog = inject(MatDialog);

  async ngOnInit() {
    await this.getAllDiseases();
  }

  async getAllDiseases() {
    this.diseases = await this.diseaseService.getAll();
  }

  openDialog(disease?: IDisease) {
    const dialogRef = this.dialog.open(DiseaseUpsertDialogComponent, {
      data: disease,
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) await this.getAllDiseases();
    });
  }
}
