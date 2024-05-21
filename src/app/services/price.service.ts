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

  public async create(data: Partial<IPrice>){
    const url = this._baseUrl + 'api/price';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.post<IPrice>(url, data, options));
  }

  public async update(data: Partial<IPrice>): Promise<IPrice> {
    const url = this._baseUrl + 'api/price';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.put<IPrice>(url, data, options));
  }

  public async delete(data: string | null): Promise<string> {
    const url = this._baseUrl + 'api/price/' + data;
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.delete<string>(url, options));
  }
}
