import {Injectable} from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
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


  public async create(data: Partial<IDisease>) {
    const url = this._baseUrl + 'api/disease';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.post<IDisease>(url, data, options));
  }

  public async update(data: Partial<IDisease>): Promise<IDisease> {
    const url = this._baseUrl + 'api/disease';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.put<IDisease>(url, data, options));
  }

  public async delete(data: string | null): Promise<string> {
    const url = this._baseUrl + 'api/disease/' + data;
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.delete<string>(url, options));
  }
}
