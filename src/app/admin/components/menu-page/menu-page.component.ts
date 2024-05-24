import {Component, inject, OnInit} from '@angular/core';
import {IMenuPage} from "../../models/menu-page";
import {AuthService} from "../../../services/auth.service";
import {aW} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit{

  menuSections: IMenuPage[] = [{
    title: 'Programări',
    menu: [
      {name: 'Adaugă', route: 'appointments'},
      {name: 'Cameră/aparat', route: 'room-or-devices'},
      {name: 'Servicii medicale', route: 'medical-services'},
      {name: 'Boli', route: 'diseases'},
    ]
  }, {
    title: 'Website',
    menu: [
      {name: 'Testimoniale', route: 'testimonials'},
      {name: 'Doctori', route: 'doctors'},
      {name: 'Oferte', route: 'prices'}]
  }];

  authService = inject(AuthService);

  async ngOnInit() {
    let doctorsSection = {
      title: 'Doctori',
      menu: [
        {name: 'Adaugă', route: 'register'},
        {name: 'Doctori', route: 'doctors-overview'}]
    }
    let hasAdminRole = await this.authService.hasRole('Admin');
    if(hasAdminRole) this.menuSections.push(doctorsSection);

  }

}
