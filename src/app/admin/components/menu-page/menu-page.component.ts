import {Component} from '@angular/core';
import {IMenuPage} from "../../models/menu-page";

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent {

  menuSections: IMenuPage[] = [{
    title: 'Programări',
    menu: [
      {name: 'Adaugă', route: 'appointments'},
      {name: 'Cameră/aparat', route: 'room-or-devices'},
      {name: 'Servicii medicale', route: 'medical-services'},
      {name: 'Boli', route: 'diseases'},
    ]
  }, {
    title: 'Doctori',
    menu: [
      {name: 'Adaugă', route: 'register'},
      {name: 'Doctori', route: 'doctors-overview'}]
  }, {
    title: 'Website',
    menu: [
      {name: 'Testimoniale', route: 'testimonials'},
      {name: 'Doctori', route: 'doctors'},
      {name: 'Oferte', route: 'prices'}]
  }];

}
