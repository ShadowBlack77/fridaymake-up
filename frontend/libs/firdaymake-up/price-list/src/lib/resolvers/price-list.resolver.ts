import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { PriceListState } from "../store/reducer";
import { loadPriceList } from "../store/actions";

@Injectable({
  providedIn: 'root'
})
export class PriceListResolver {

  private readonly _store: Store<PriceListState> = inject(Store);

  resolve() {
    this._store.dispatch(loadPriceList());
  }
}