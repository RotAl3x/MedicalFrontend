import {Component} from '@angular/core';
import {DoctorService} from "../../services/doctor.service";
import {CarouselConfig} from "ngx-bootstrap/carousel";
import {TestimonialPersonService} from "../../services/testimonial-person.service";
import {ITestimonialPerson} from "../../models/testimonial-person";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  providers: [
    {provide: CarouselConfig, useValue: {interval: 1500, noPause: false, showIndicators: true}}
  ],
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  details: string[] = [
    "Cel mai bun cabinet",
    "Preturi imbatabile",
    "Locație accesibilă",
    "x clienți fericiți",
    "Venim și la domiciliu"
  ]

  options: google.maps.MapOptions = {
    center: {lat: environment.lat, lng: environment.lng},
    zoom: 16
  };
  markerPosition: google.maps.LatLngLiteral = {lat: environment.lat, lng: environment.lng}
  apiLoaded: Observable<boolean>;

  testimonialPersons: ITestimonialPerson[] = [];
  protected readonly environment = environment;

  constructor(private doctorService: DoctorService,
              private httpClient: HttpClient,
              private testimonialPersonService: TestimonialPersonService) {
    this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  async ngOnInit() {
    this.testimonialPersons = await this.testimonialPersonService.getAll();
    const doctorCount = (await this.doctorService.getAll()).length;
    this.details.push(`${doctorCount} doctori experimentați`)
  }
}
