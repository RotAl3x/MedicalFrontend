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
import {
  TestimonialUpsertPageComponent
} from "./admin/components/testimonial-upsert-page/testimonial-upsert-page.component";
import {DoctorUpsertPageComponent} from "./admin/components/doctor-upsert-page/doctor-upsert-page.component";
import {PriceUpsertPageComponent} from "./admin/components/price-upsert-page/price-upsert-page.component";
import {
  RoomOrDeviceUpsertPageComponent
} from "./admin/components/room-or-device-upsert-page/room-or-device-upsert-page.component";
import {
  MedicalServiceUpsertPageComponent
} from "./admin/components/medical-service-upsert-page/medical-service-upsert-page.component";
import {DiseaseUpsertPageComponent} from "./admin/components/disease-upsert-page/disease-upsert-page.component";
import {ChangePasswordPageComponent} from "./admin/components/change-password-page/change-password-page.component";

const routes: Routes = [
  {path: 'prices', component: PricesPageComponent},
  {path: 'doctors', component: DoctorsPageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'appointment/delete/:id', component: DeleteAppointmentPageComponent},
  {path: 'admin/register', component: RegisterPageComponent, canActivate:[loginGuard]},
  {path:'admin/home', component:MenuPageComponent, canActivate:[loginGuard]},
  {path:'admin/appointments', component:AppointmentsPageComponent, canActivate:[loginGuard]},
  {path:'admin/testimonials', component:TestimonialUpsertPageComponent, canActivate:[loginGuard]},
  {path:'admin/doctors', component:DoctorUpsertPageComponent, canActivate:[loginGuard]},
  {path:'admin/prices', component:PriceUpsertPageComponent, canActivate:[loginGuard]},
  {path:'admin/room-or-devices', component:RoomOrDeviceUpsertPageComponent, canActivate:[loginGuard]},
  {path:'admin/medical-services',component:MedicalServiceUpsertPageComponent, canActivate:[loginGuard]},
  {path:'admin/diseases',component:DiseaseUpsertPageComponent, canActivate:[loginGuard]},
  {path:'admin/change-password',component:ChangePasswordPageComponent, canActivate:[loginGuard]},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
