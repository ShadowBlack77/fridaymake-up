import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { PortfolioState } from "../store/reducer";
import { loadPortfolio } from "../store/actions";

@Injectable({
  providedIn: 'root'
})
export class PortfolioResolver {

  private readonly _store: Store<PortfolioState> = inject(Store);

  resolve(): void {
    this._store.dispatch(loadPortfolio());
  }
}