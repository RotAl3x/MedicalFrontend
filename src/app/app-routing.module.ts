import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegisterPageComponent} from "./admin/components/register-page/register-page.component";
import {PricesPageComponent} from "./components/prices-page/prices-page.component";
import {DoctorsPageComponent} from "./components/doctors-page/doctors-page.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {MenuPageComponent} from "./admin/components/menu-page/menu-page.component";
import {loginGuard} from "./admin/guards/login.guard";
import {AppointmentsPageComponent} from "./admin/components/appointments-page/appointments-page.component";
import {DeleteAppointmentPageComponent} from "./components/delete-appointment-page/delete-appointment-page.component";

const routes: Routes = [
  {path: 'prices', component: PricesPageComponent},
  {path: 'doctors', component: DoctorsPageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'appointment/delete/:id', component: DeleteAppointmentPageComponent},
  {path: 'admin/register', component: RegisterPageComponent, canActivate:[loginGuard]},
  {path:'admin/home', component:MenuPageComponent, canActivate:[loginGuard]},
  {path:'admin/appointments', component:AppointmentsPageComponent, canActivate:[loginGuard]},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
