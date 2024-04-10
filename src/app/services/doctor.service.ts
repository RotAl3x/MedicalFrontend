import { Injectable } from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {firstValueFrom} from "rxjs";
import {IDoctor} from "../models/doctor";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly _baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  public async getAll(): Promise<IDoctor[]> {
    const url = this._baseUrl + 'api/doctor/getAll'
    return await firstValueFrom(this.http.get<IDoctor[]>(url));
  }
}
