import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {ISettings} from "../../models/settings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly _baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  photoLink(name: string | null) {
    return `${this._baseUrl}api/settings/photo/${name}`
  }

  async getDoctorPassword(): Promise<string> {
    const url = this._baseUrl + 'api/settings/doctor-initial-password';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.get<string>(url, options));
  }

  async getSettings(): Promise<ISettings> {
    const url = this._baseUrl + 'api/settings';
    return await firstValueFrom(this.http.get<ISettings>(url));
  }

  async createSettings(settings: Partial<ISettings>): Promise<ISettings> {
    const url = this._baseUrl + 'api/settings';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.post<ISettings>(url, settings, options));
  }

  async updateSettings(settings: Partial<ISettings>): Promise<ISettings> {
    const url = this._baseUrl + 'api/settings';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.put<ISettings>(url, settings, options));
  }

  public async addPhoto(data: FormData): Promise<string> {
    const url = this._baseUrl + 'api/settings/photo/upload-photo';
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // @ts-ignore
    return await firstValueFrom(this.http.post<any>(url, data, {responseType: 'text' as const}));
  }
}
