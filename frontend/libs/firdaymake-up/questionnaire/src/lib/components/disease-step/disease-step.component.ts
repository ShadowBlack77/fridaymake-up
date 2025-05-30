import { CommonModule } from "@angular/common";
import { AfterContentChecked, AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { selectSkinTypes, SkinTypes, SkinTypesState } from "@lib/fridaymake-up/informations";
import { Store } from "@ngrx/store";
import { debounceTime, Observable } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveDisease } from "../../store/actions";

@Component({
  selector: 'lib-disease-step',
  templateUrl: './disease-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: DiseaseStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class DiseaseStepComponent implements AfterContentInit {
 
  private readonly _store: Store<SkinTypesState | QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);

  protected readonly skinTypes$: Observable<SkinTypes[]> = this._store.select(selectSkinTypes);

  readonly form = this._formBuilder.group({
    diseaseThree: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    skinShiny: new FormControl(false, {
      nonNullable: true, 
      validators: [
        Validators.required
      ]
    }),
    skinType: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })
  });

  readonly isValid: OutputEmitterRef<boolean> = output<boolean>();

  ngAfterContentInit(): void {
    this.form.statusChanges.subscribe((status: FormControlStatus) => {
      this.isValid.emit(status === 'VALID');
    });

    this.form.valueChanges.pipe(
      debounceTime(100)
    ).subscribe((value) => {
      const disease = {
        diseaseThree: value.diseaseThree!,
        skinShiny: value.skinShiny!,
        skinType: value.skinType!
      }

      this._store.dispatch(saveDisease({ disease }));
    });
  }
}