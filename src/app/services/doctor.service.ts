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

  public async create(data: Partial<IDoctor>){
    const url = this._baseUrl + 'api/doctor';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.post<IDoctor>(url, data, options));
  }

  public async update(data: Partial<IDoctor>): Promise<IDoctor> {
    const url = this._baseUrl + 'api/doctor';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.put<IDoctor>(url, data, options));
  }

  public async delete(data: string | null): Promise<string> {
    const url = this._baseUrl + 'api/doctor/' + data;
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.delete<string>(url, options));
  }
}
