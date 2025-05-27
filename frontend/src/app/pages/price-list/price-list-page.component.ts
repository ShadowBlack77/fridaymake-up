import { Component } from "@angular/core";
import { PriceListComponent } from "@lib/fridaymake-up/price-list";
import { FooterComponent } from "@lib/shared/footer";

@Component({
  selector: 'app-price-list-page',
  templateUrl: './price-list-page.component.html',
  imports: [
    PriceListComponent,
    FooterComponent
  ]
})
export class PriceListPage {}