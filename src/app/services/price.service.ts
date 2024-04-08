import { Injectable } from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {IPrice} from "../models/price";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private readonly _baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  public async getAll(): Promise<IPrice[]> {
    const url = this._baseUrl + 'api/price/getAll'
    return await firstValueFrom(this.http.get<IPrice[]>(url));
  }
}
