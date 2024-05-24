import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const isAdmin = await authService.hasRole('Admin')
  return isAdmin ? true : router.navigate(['login']);
};
