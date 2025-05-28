import { AfterViewInit, Component, inject, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { PriceListState } from "../../store/reducer";
import { Observable } from "rxjs";
import { Price } from "../../models/price.model";
import { selectPriceList } from "../../store/selectors";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'lib-price-list',
  templateUrl: './price-list.component.html',
  imports: [
    CommonModule,
    NgOptimizedImage,
  ],
  animations: [
    trigger('fade-in-price-list', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s ease-in')
      ])
    ]),
  ]
})
export class PriceListComponent implements AfterViewInit {

  private readonly _store: Store<PriceListState> = inject(Store);

  protected readonly priceList$: Observable<Price[]> = this._store.select(selectPriceList);
  protected readonly priceListState: WritableSignal<string> = signal('hidden');

  ngAfterViewInit(): void {
    this.priceListState.set('show');
  }
}