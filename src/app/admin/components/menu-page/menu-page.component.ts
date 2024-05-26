import {Component, inject, OnInit} from '@angular/core';
import {IMenuPage} from "../../models/menu-page";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  menuSections: IMenuPage[] = [{
    title: 'Programări',
    menu: [
      {name: 'Adaugă', route: 'appointments'},
      {name: 'Cameră/aparat', route: 'room-or-devices'},
      {name: 'Servicii medicale', route: 'medical-services'},
      {name: 'Boli', route: 'diseases'},
      {name: 'Zile libere cabinet', route: 'cabinet-free-days'},
      {name: 'Zile libere doctor', route: 'doctor-free-days'},
    ]
  }];

  authService = inject(AuthService);

  async ngOnInit() {
    let websiteSection = {
      title: 'Website',
      menu: [
        {name: 'Testimoniale', route: 'testimonials'},
        {name: 'Doctori', route: 'doctors'},
        {name: 'Oferte', route: 'prices'},
        {name: 'Setări', route: 'settings'}]
    };

    let doctorsSection = {
      title: 'Doctori',
      menu: [
        {name: 'Adaugă', route: 'register'},
        {name: 'Doctori', route: 'doctors-overview'}]
    }
    let hasAdminRole = await this.authService.hasRole('Admin');
    if (hasAdminRole) {
      this.menuSections.push(websiteSection);
      this.menuSections.push(doctorsSection);
    }

  }

}
