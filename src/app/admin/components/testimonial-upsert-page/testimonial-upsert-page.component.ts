import {Component, inject, OnInit} from '@angular/core';
import {ITestimonialPerson} from "../../../models/testimonial-person";
import {TestimonialPersonService} from "../../../services/testimonial-person.service";
import {MatDialog} from "@angular/material/dialog";
import {TestimonialUpsertDialogComponent} from "./testimonial-upsert-dialog/testimonial-upsert-dialog.component";

@Component({
  selector: 'app-testimonial-upsert-page',
  templateUrl: './testimonial-upsert-page.component.html',
  styleUrls: ['./testimonial-upsert-page.component.scss']
})
export class TestimonialUpsertPageComponent implements OnInit {

  testimonialPersons: ITestimonialPerson[] = [];
  testimonialPersonService = inject(TestimonialPersonService);
  private dialog = inject(MatDialog);

  async ngOnInit() {
    await this.getAllTestimonialPerson();
  }

  async getAllTestimonialPerson() {
    this.testimonialPersons = await this.testimonialPersonService.getAll();
  }

  openDialog(testimonial?: ITestimonialPerson) {
    const dialogRef = this.dialog.open(TestimonialUpsertDialogComponent, {
      data: testimonial,
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) await this.getAllTestimonialPerson();
    });
  }

}
