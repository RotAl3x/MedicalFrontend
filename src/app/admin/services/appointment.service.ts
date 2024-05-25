import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable,} from "rxjs";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {environment} from "../../../environment/environment";
import {IAppointment} from "../models/appointment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private hubConnectionBuilder!: HubConnection;
  private _baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);
  private authService = inject(AuthService);


  async connect() {
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl(`${this._baseUrl}appointment`).configureLogging(LogLevel.Information).build();
    await this.hubConnectionBuilder.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));
    return true;
  }

  appointmentUpdated$(): Observable<IAppointment | null> {
    let pendingAppointmentUpdatedSubject = new BehaviorSubject<IAppointment | null>(null);
    this.hubConnectionBuilder.on('SendAppointmentToUser', (result: IAppointment) => {
      pendingAppointmentUpdatedSubject.next(result);
    });
    return pendingAppointmentUpdatedSubject;
  }

  getAllByRoomIdOrDoctorId(roomId: string, doctorId: string) {
    const searchUrl = roomId && doctorId ? `${roomId}/${doctorId}` : roomId ? `roomId/${roomId}` : `doctorId/${doctorId}`
    const url = this._baseUrl + `api/appointment/${searchUrl}`;
    return this.http.get<IAppointment[]>(url);
  }

  async addAppointment(appointment: Partial<IAppointment>) {
    const url = this._baseUrl + 'api/appointment';
    const options = await this.authService.getOptions(true);
    return firstValueFrom(this.http.post(url, appointment, options));
  }

  async deleteAppointment(id: string) {
    const url = this._baseUrl + `api/appointment/${id}`;
    return await firstValueFrom(this.http.delete<string>(url));
  }

  async getCabinetFreeDays() {
    const url = this._baseUrl + `api/appointment/cabinet-free-days`;
    let options = await this.authService.getOptions(true);
    options.responseType = null
    return await firstValueFrom(this.http.get<IAppointment[]>(url, options));
  }

  async getDoctorFreeDays(id: string) {
    const url = this._baseUrl + `api/appointment/doctor-free-days/${id}`;
    let options = await this.authService.getOptions(true);
    options.responseType = null;
    return await firstValueFrom(this.http.get<IAppointment[]>(url, options));
  }
}
