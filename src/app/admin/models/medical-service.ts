import {IEntity} from "../../models/entity";

export interface IMedicalService extends IEntity{
  name:string,
  duration: number,
}
