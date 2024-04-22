import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {IMedicalService} from "../models/medical-service";
import {firstValueFrom} from "rxjs";
import {IDisease} from "../models/disease";

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
  private readonly _baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  public async getAll(): Promise<IDisease[]> {
    const url = this._baseUrl + 'api/disease/getAll'
    return await firstValueFrom(this.http.get<IDisease[]>(url));
  }
}
