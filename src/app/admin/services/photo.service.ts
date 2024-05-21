import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly _baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  photoLink(name:string | null){
    return `${this._baseUrl}api/settings/photo/${name}`
  }

  public async addPhoto(data: FormData): Promise<string> {
    const url = this._baseUrl + 'api/settings/photo/upload-photo';
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // @ts-ignore
    return await firstValueFrom(this.http.post<any>(url, data, {responseType: 'text' as const}));
  }
}
