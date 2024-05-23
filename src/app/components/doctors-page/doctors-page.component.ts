import {Component, OnInit} from '@angular/core';
import {DoctorService} from "../../services/doctor.service";
import {IDoctor} from "../../models/doctor";

@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors-page.component.html',
  styleUrls: ['./doctors-page.component.scss']
})
export class DoctorsPageComponent implements OnInit {
  doctors: IDoctor[] = [];

  constructor(private doctorService: DoctorService) {
  }

  async ngOnInit() {
    this.doctors = await this.doctorService.getAll();
  }
}
