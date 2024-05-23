import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {firstValueFrom} from "rxjs";
import {IRoomOrDevice} from "../models/room-or-device";

@Injectable({
  providedIn: 'root'
})
export class RoomOrDeviceService {
  private readonly _baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  public async getAll(): Promise<IRoomOrDevice[]> {
    const url = this._baseUrl + 'api/roomOrDevice/getAll'
    return await firstValueFrom(this.http.get<IRoomOrDevice[]>(url));
  }

  public async create(data: Partial<IRoomOrDevice>){
    const url = this._baseUrl + 'api/roomOrDevice';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.post<IRoomOrDevice>(url, data, options));
  }

  public async update(data: Partial<IRoomOrDevice>): Promise<IRoomOrDevice> {
    const url = this._baseUrl + 'api/roomOrDevice';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.put<IRoomOrDevice>(url, data, options));
  }

  public async delete(data: string | null): Promise<string> {
    const url = this._baseUrl + 'api/roomOrDevice/' + data;
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.delete<string>(url, options));
  }
}
