import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../models/login";

@Component({
  selector: 'app-all-doctors-page',
  templateUrl: './all-doctors-page.component.html',
  styleUrls: ['./all-doctors-page.component.scss']
})
export class AllDoctorsPageComponent implements OnInit{
  doctorUsers: IUser[] = []

  authService = inject(AuthService);
  async ngOnInit() {
    await this.getAllDoctors();
  }

  async getAllDoctors(){
    this.doctorUsers = await this.authService.getUsersByRole("Doctor");
  }

}
