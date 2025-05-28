import { inject, Injectable } from "@angular/core";
import { SkinTypesState } from "../store/reducer";
import { Store } from "@ngrx/store";
import { loadSkinTypes } from "../store/actions";

@Injectable({
  providedIn: 'root'
})
export class SkinTypesResolver {

  private readonly _store: Store<SkinTypesState> = inject(Store);

  resolve(): void {
    this._store.dispatch(loadSkinTypes());
  }
}