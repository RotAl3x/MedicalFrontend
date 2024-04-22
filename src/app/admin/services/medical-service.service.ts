import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {IRoomOrDevice} from "../models/room-or-device";
import {firstValueFrom} from "rxjs";
import {IMedicalService} from "../models/medical-service";

@Injectable({
  providedIn: 'root'
})
export class MedicalServiceService {
  private readonly _baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  public async getAll(): Promise<IMedicalService[]> {
    const url = this._baseUrl + 'api/medicalService/getAll'
    return await firstValueFrom(this.http.get<IMedicalService[]>(url));
  }
}
