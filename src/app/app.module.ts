import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {RouterOutlet} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {RegisterPageComponent} from './admin/components/register-page/register-page.component';
import {MenuComponent} from './components/menu/menu.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {PricesPageComponent} from './components/prices-page/prices-page.component';
import {DoctorsPageComponent} from './components/doctors-page/doctors-page.component';
import {HeaderComponent} from './components/header/header.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HttpRequestInterceptorInterceptor} from "./interceptors/http-request-interceptor.interceptor";
import {HomePageComponent} from './components/home-page/home-page.component';
import {CarouselModule} from "ngx-bootstrap/carousel";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {MedicalCardComponent} from './components/medical-card/medical-card.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {FooterComponent} from './components/footer/footer.component';
import {MenuPageComponent} from './admin/components/menu-page/menu-page.component';
import {AppointmentsPageComponent} from './admin/components/appointments-page/appointments-page.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DialogAppointmentComponent} from './admin/components/dialog-appointment/dialog-appointment.component';
import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {
  DialogAppointmentOverlapComponent
} from './admin/components/dialog-appointment-overlap/dialog-appointment-overlap.component';
import {DeleteAppointmentPageComponent} from './components/delete-appointment-page/delete-appointment-page.component';
import {
  TestimonialUpsertPageComponent
} from './admin/components/testimonial-upsert-page/testimonial-upsert-page.component';
import {
  TestimonialUpsertDialogComponent
} from './admin/components/testimonial-upsert-page/testimonial-upsert-dialog/testimonial-upsert-dialog.component';
import {DoctorUpsertPageComponent} from './admin/components/doctor-upsert-page/doctor-upsert-page.component';
import {
  DoctorUpsertDialogComponent
} from './admin/components/doctor-upsert-page/doctor-upsert-dialog/doctor-upsert-dialog.component';
import {PriceUpsertPageComponent} from './admin/components/price-upsert-page/price-upsert-page.component';
import {
  PriceUpsertDialogComponent
} from './admin/components/price-upsert-page/price-upsert-dialog/price-upsert-dialog.component';
import {
  RoomOrDeviceUpsertPageComponent
} from './admin/components/room-or-device-upsert-page/room-or-device-upsert-page.component';
import {
  RoomOrDeviceUpsertDialogComponent
} from './admin/components/room-or-device-upsert-page/room-or-device-upsert-dialog/room-or-device-upsert-dialog.component';
import {
  MedicalServiceUpsertPageComponent
} from './admin/components/medical-service-upsert-page/medical-service-upsert-page.component';
import {
  MedicalServiceUpsertDialogComponent
} from './admin/components/medical-service-upsert-page/medical-service-upsert-dialog/medical-service-upsert-dialog.component';
import {DiseaseUpsertPageComponent} from './admin/components/disease-upsert-page/disease-upsert-page.component';
import {
  DiseaseUpsertDialogComponent
} from './admin/components/disease-upsert-page/disease-upsert-dialog/disease-upsert-dialog.component';
import {AllDoctorsPageComponent} from './admin/components/all-doctors-page/all-doctors-page.component';
import {ChangePasswordPageComponent} from './admin/components/change-password-page/change-password-page.component';
import { CabinetFreeDaysPageComponent } from './admin/components/cabinet-free-days-page/cabinet-free-days-page.component';
import { DoctorFreeDaysPageComponent } from './admin/components/doctor-free-days-page/doctor-free-days-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MenuComponent,
    PricesPageComponent,
    DoctorsPageComponent,
    HeaderComponent,
    HomePageComponent,
    MedicalCardComponent,
    FooterComponent,
    MenuPageComponent,
    AppointmentsPageComponent,
    DialogAppointmentComponent,
    DialogAppointmentOverlapComponent,
    DeleteAppointmentPageComponent,
    TestimonialUpsertPageComponent,
    TestimonialUpsertDialogComponent,
    DoctorUpsertPageComponent,
    DoctorUpsertDialogComponent,
    PriceUpsertPageComponent,
    PriceUpsertDialogComponent,
    RoomOrDeviceUpsertPageComponent,
    RoomOrDeviceUpsertDialogComponent,
    MedicalServiceUpsertPageComponent,
    MedicalServiceUpsertDialogComponent,
    DiseaseUpsertPageComponent,
    DiseaseUpsertDialogComponent,
    AllDoctorsPageComponent,
    ChangePasswordPageComponent,
    CabinetFreeDaysPageComponent,
    DoctorFreeDaysPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterOutlet,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ButtonsModule,
    CarouselModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    FullCalendarModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptorInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'ro-Ro'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
