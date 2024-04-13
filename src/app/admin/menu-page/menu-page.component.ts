import {Component} from '@angular/core';
import {IMenuPage} from "../models/menu-page";

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent {

  menuSections: IMenuPage[] = [{title: 'Programari', menu: []}, {title: 'Doctori', menu: [{name:'test',route:'home'},{name:'test',route:'home'}]}, {
    title: 'Website',
    menu: []
  }];

}
