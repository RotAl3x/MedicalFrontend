import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  router = inject(Router)
  authService = inject(AuthService)


  isAdminPage() {
    return this.router.url.includes('/admin')
  }

  async logout() {
    await this.authService.logout();
  }

}
