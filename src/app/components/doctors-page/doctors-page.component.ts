import {Component, OnInit} from '@angular/core';
import {DoctorService} from "../../services/doctor.service";
import {IDoctor} from "../../models/doctor";
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors-page.component.html',
  styleUrls: ['./doctors-page.component.scss']
})
export class DoctorsPageComponent implements OnInit{
  doctors:IDoctor[] = [];
  private readonly _baseUrl = environment.apiUrl;

  constructor(private doctorService:DoctorService) {
  }

  async ngOnInit() {
    this.doctors = await this.doctorService.getAll();
  }

  photoLink(name:string | null){
    return `${this._baseUrl}api/settings/photo/${name}`
  }
}
