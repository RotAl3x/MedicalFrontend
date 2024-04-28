import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
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
import { RegisterPageComponent } from './admin/components/register-page/register-page.component';
import { MenuComponent } from './components/menu/menu.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import { PricesPageComponent } from './components/prices-page/prices-page.component';
import { DoctorsPageComponent } from './components/doctors-page/doctors-page.component';
import { HeaderComponent } from './components/header/header.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HttpRequestInterceptorInterceptor} from "./interceptors/http-request-interceptor.interceptor";
import { HomePageComponent } from './components/home-page/home-page.component';
import {CarouselModule} from "ngx-bootstrap/carousel";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import { MedicalCardComponent } from './components/medical-card/medical-card.component';
import {GoogleMapsModule} from "@angular/google-maps";
import { FooterComponent } from './components/footer/footer.component';
import { MenuPageComponent } from './admin/components/menu-page/menu-page.component';
import { AppointmentsPageComponent } from './admin/components/appointments-page/appointments-page.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { DialogAppointmentComponent } from './admin/components/dialog-appointment/dialog-appointment.component';


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
    DialogAppointmentComponent
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
    NgxMatNativeDateModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass:HttpRequestInterceptorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
