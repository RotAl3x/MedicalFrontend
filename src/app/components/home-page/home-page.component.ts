import {Component} from '@angular/core';
import {IDoctor} from "../../models/doctor";
import {environment} from "../../../environment/environment";
import {DoctorService} from "../../services/doctor.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  details: string[] = [
    "Cel mai bun cabinet",
    "Preturi imbatabile",
    "Locație accesibilă",
    "x clienți fericiți",
    "Venim și la domiciliu"

  ]

  constructor(private doctorService: DoctorService) {
  }


  async ngOnInit() {
    const doctorCount = (await this.doctorService.getAll()).length;
    this.details.push(`${doctorCount} doctori experimentați`)
  }

}
