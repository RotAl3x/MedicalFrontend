import {IEntity} from "../../models/entity";

export interface IAppointment extends IEntity {
  start: Date | null;
  end: Date | null;
  startDateForMessage: Date | null,
  roomOrDeviceId: string | null;
  applicationUserId: string | null;
  medicalServiceId: string | null;
  name: string | null;
  phone: string | null;
  diseaseId: string | null;
  isFree: boolean | null;
  isDoctorFree: boolean | null;
}
