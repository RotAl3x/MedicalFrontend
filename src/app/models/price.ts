import {IEntity} from "./entity";

export interface IPrice extends IEntity {
  name: string | null,
  priceForOne: number | null,
  numberOfMeets: number | null,
  priceForAllMeets: number | null
}
