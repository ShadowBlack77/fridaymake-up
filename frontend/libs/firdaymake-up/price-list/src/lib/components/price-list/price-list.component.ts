import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { PriceListState } from "../../store/reducer";
import { Observable } from "rxjs";
import { Price } from "../../models/price.model";
import { selectPriceList } from "../../store/selectors";
import { CommonModule, NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'lib-price-list',
  templateUrl: './price-list.component.html',
  imports: [
    CommonModule,
    NgOptimizedImage,
  ]
})
export class PriceListComponent {

  private readonly _store: Store<PriceListState> = inject(Store);

  protected readonly priceList$: Observable<Price[]> = this._store.select(selectPriceList);
}