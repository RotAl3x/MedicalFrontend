import {Component, OnInit, inject} from '@angular/core';
import {IPrice} from "../../../models/price";
import {PriceService} from "../../../services/price.service";
import {MatDialog} from "@angular/material/dialog";
import {PriceUpsertDialogComponent} from "./price-upsert-dialog/price-upsert-dialog.component";

@Component({
  selector: 'app-price-upsert-page',
  templateUrl: './price-upsert-page.component.html',
  styleUrls: ['./price-upsert-page.component.scss']
})
export class PriceUpsertPageComponent implements OnInit {
  prices: IPrice[] = []
  priceService = inject(PriceService);
  private dialog = inject(MatDialog);

  async ngOnInit() {
    await this.getAllPrices();
  }

  async getAllPrices() {
    this.prices = await this.priceService.getAll();
  }

  openDialog(price?: IPrice) {
    const dialogRef = this.dialog.open(PriceUpsertDialogComponent, {
      data: price
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) await this.getAllPrices()
    })
  }
}
