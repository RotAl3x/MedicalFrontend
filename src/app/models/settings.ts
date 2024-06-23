import {IEntity} from "./entity";

export interface ISettings extends IEntity {
  lat: number | null;
  lng: number | null;
  address: string | null;
  phone: string | null;
  linkFacebook: string | null;
  linkInstagram: string | null;
  workingHours: string | null;
}
