import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable,} from "rxjs";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {environment} from "../../../environment/environment";
import {IAppointment} from "../models/appointment";
import {IDoctor} from "../../models/doctor";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private hubConnectionBuilder!: HubConnection;
  private _baseUrl: string = environment.apiUrl;
  private http= inject(HttpClient);


  async connect() {
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl(`${this._baseUrl}appointment`).configureLogging(LogLevel.Information).build();
    await this.hubConnectionBuilder.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));
    return true;
  }

  appointmentUpdated$(): Observable<IAppointment|null> {
    let pendingAppointmentUpdatedSubject = new BehaviorSubject<IAppointment|null>(null);
    this.hubConnectionBuilder.on('SendAppointmentToUser', (result: IAppointment) => {
      pendingAppointmentUpdatedSubject.next(result);
    });
    return pendingAppointmentUpdatedSubject;
  }

  getAllByRoomIdOrDoctorId(roomId: string, doctorId:string){
    const url = this._baseUrl + `api/appointment/$${roomId}/$${doctorId}`;
    return this.http.get<IAppointment[]>(url);
  }
}