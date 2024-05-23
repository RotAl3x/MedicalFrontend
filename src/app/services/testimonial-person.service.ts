import {Injectable} from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
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

  public async create(data: Partial<ITestimonialPerson>) {
    const url = this._baseUrl + 'api/testimonial-person';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.post<ITestimonialPerson>(url, data, options));
  }

  public async update(data: Partial<ITestimonialPerson>): Promise<ITestimonialPerson> {
    const url = this._baseUrl + 'api/testimonial-person';
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.put<ITestimonialPerson>(url, data, options));
  }

  public async delete(data: string | null): Promise<string> {
    const url = this._baseUrl + 'api/testimonial-person/' + data;
    const options = await this.authService.getOptions(true);
    return await firstValueFrom(this.http.delete<string>(url, options));
  }
}
