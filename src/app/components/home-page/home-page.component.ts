import {Component, OnInit} from '@angular/core';
import {DoctorService} from "../../services/doctor.service";
import {CarouselConfig} from "ngx-bootstrap/carousel";
import {TestimonialPersonService} from "../../services/testimonial-person.service";
import {ITestimonialPerson} from "../../models/testimonial-person";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {ISettings} from "../../models/settings";
import {SettingsService} from "../../admin/services/settings.service";
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  providers: [
    {provide: CarouselConfig, useValue: {interval: 1500, noPause: false, showIndicators: true}}
  ],
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  details: string[] = [
    "Cel mai bun cabinet",
    "Expertiză medicală de încredere",
    "Preturi imbatabile",
    "Locație accesibilă",
    "Venim și la domiciliu",
  ]
  settings!: ISettings;

  options!: google.maps.MapOptions;
  markerPosition!: google.maps.LatLngLiteral;
  apiLoaded: Observable<boolean>;

  testimonialPersons: ITestimonialPerson[] = [];

  constructor(private doctorService: DoctorService,
              private settingsService: SettingsService,
              private httpClient: HttpClient,
              private testimonialPersonService: TestimonialPersonService) {
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  async ngOnInit() {
    this.settings = await this.settingsService.getSettings();
    this.options = {
      center: {lat: this.settings.lat ?? 0, lng: this.settings.lng ?? 0},
      zoom: 16
    }
    this.markerPosition = {lat: this.settings.lat ?? 0, lng: this.settings.lng ?? 0}
    this.testimonialPersons = await this.testimonialPersonService.getAll();
    const doctorCount = (await this.doctorService.getAll()).length;
    this.details.push(`${doctorCount} doctori experimentați`)
  }
}
