import {Component, OnInit} from '@angular/core';
import {IPrice} from "../../models/price";
import {PriceService} from "../../services/price.service";

@Component({
  selector: 'app-prices-page',
  templateUrl: './prices-page.component.html',
  styleUrls: ['./prices-page.component.scss']
})
export class PricesPageComponent implements OnInit {
  prices: IPrice[] = [];

  constructor(private priceService: PriceService) {
  }

  async ngOnInit() {
    this.prices = await this.priceService.getAll();
  }
}
