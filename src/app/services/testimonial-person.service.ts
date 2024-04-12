import { Injectable } from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {IDoctor} from "../models/doctor";
import {firstValueFrom} from "rxjs";
import {ITestimonialPerson} from "../models/testimonial-person";

@Injectable({
  providedIn: 'root'
})
export class TestimonialPersonService {
  private readonly _baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  public async getAll(): Promise<ITestimonialPerson[]> {
    const url = this._baseUrl + 'api/testimonial-person/getAll'
    return await firstValueFrom(this.http.get<ITestimonialPerson[]>(url));
  }
}
