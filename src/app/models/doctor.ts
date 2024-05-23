import {IEntity} from "./entity";

export interface IDoctor extends IEntity {
  name: string | null,
  description: string | null,
  photoName: string | null,
}
