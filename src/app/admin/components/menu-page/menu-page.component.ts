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
    menu: [{name: 'Adaugă', route: 'appointments'}]
  }, {title: 'Doctori',
    menu: [{name: 'Adaugă', route: 'register'}]}, {
    title: 'Website',
    menu: [{name:'Testimoniale', route: 'testimonials'}]
  }];

}
