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
}
