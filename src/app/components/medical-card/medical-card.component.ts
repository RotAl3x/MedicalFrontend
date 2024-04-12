import {Component, Input} from '@angular/core';
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-medical-card',
  templateUrl: './medical-card.component.html',
  styleUrls: ['./medical-card.component.scss']
})
export class MedicalCardComponent {
  @Input() name:string|null='';
  @Input() description:string|null='';
  @Input() photoName:string|null='';
  @Input() maxWidth:number=0;
  private readonly _baseUrl = environment.apiUrl;

  photoLink(name:string | null){
    return `${this._baseUrl}api/settings/photo/${name}`
  }
}
