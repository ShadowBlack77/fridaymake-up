import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { SkinTypesState } from "../../store/reducer";
import { Observable } from "rxjs";
import { SkinTypes } from "../../models/skin-types.model";
import { selectSkinTypes } from "../../store/selectors";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'lib-skin-types-list',
  templateUrl: './skin-types-list.component.html',
  imports: [
    CommonModule
  ]
})
export class SkinTypesListComponent {

  private readonly _store: Store<SkinTypesState> = inject(Store);

  protected readonly skinTypes$: Observable<SkinTypes[]> = this._store.select(selectSkinTypes);
}