import {IEntity} from "../../models/entity";

export interface IAppointment extends IEntity {
  start: Date;
  end: Date;
  roomOrDeviceId: string;
  applicationUserId: string;
  medicalServiceId: string;
  phone:string;
  diseaseId:string;
}
