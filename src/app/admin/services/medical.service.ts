import {Injectable} from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {firstValueFrom} from "rxjs";
import {IMedicalService} from "../models/medical-service";

@Injectable({
  providedIn: 'root'
})
export class MedicalService {
  private readonly _baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  public async getAll(): Promise<IMedicalService[]> {
    const url = this._baseUrl + 'api/medicalService/getAll'
    return await firstValueFrom(this.http.get<IMedicalService[]>(url));
  }

  public async create(data: Partial<IMedicalService>) {
    const url = this._baseUrl + 'api/medicalService';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.post<IMedicalService>(url, data, options));
  }

  public async update(data: Partial<IMedicalService>): Promise<IMedicalService> {
    const url = this._baseUrl + 'api/medicalService';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.put<IMedicalService>(url, data, options));
  }

  public async delete(data: string | null): Promise<string> {
    const url = this._baseUrl + 'api/medicalService/' + data;
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.delete<string>(url, options));
  }
}
