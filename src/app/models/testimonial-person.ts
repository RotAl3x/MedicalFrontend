import {IEntity} from "./entity";

export interface ITestimonialPerson  extends IEntity {
  name: string | null,
  description: string | null,
  photoName: string| null,
}
