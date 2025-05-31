import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { PortfolioState } from "../store/reducer";
import { Observable } from "rxjs";
import { Portfolio } from "../models/portoflio.model";
import { selectPortfolio } from "../store/selectors";

@Component({
  selector: 'lib-portfolio-masonary',
  templateUrl: './portfolio.component.html',
  imports: [
    NgOptimizedImage,
    CommonModule
  ],
})
export class PortfolioMasonaryComponent {

  private readonly _store: Store<PortfolioState> = inject(Store);
  
  protected readonly portfolio$: Observable<Portfolio[]> = this._store.select(selectPortfolio);
}