import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../models/login";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-all-doctors-page',
  templateUrl: './all-doctors-page.component.html',
  styleUrls: ['./all-doctors-page.component.scss']
})
export class AllDoctorsPageComponent implements OnInit {
  doctorUsers: IUser[] = []
  authService = inject(AuthService);
  private snack = inject(MatSnackBar);

  async ngOnInit() {
    await this.getAllDoctors();
  }

  openSnackBar(message: string, action: string) {
    this.snack.open(message, action);
  }

  async getAllDoctors() {
    this.doctorUsers = await this.authService.getUsersByRole("Doctor");
  }

  async onDelete(doctorId: string) {
    try {
      await this.authService.delete(doctorId);
      this.openSnackBar('Doctor șters', 'OK');
    } catch (e) {
      this.openSnackBar('Eroare', 'OK');
    }
    await this.getAllDoctors();
  }

}
