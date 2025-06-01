import { CommonModule } from "@angular/common";
import { AfterContentChecked, AfterContentInit, Component, inject, OnDestroy, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { selectSkinTypes, SkinTypes, SkinTypesState } from "@lib/fridaymake-up/informations";
import { Store } from "@ngrx/store";
import { debounceTime, Observable, Subject, takeUntil } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveDisease } from "../../store/actions";
import { selectUserQuestionnaire } from "../../store/selectors";

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
export class DiseaseStepComponent implements AfterContentInit, AfterContentChecked, OnDestroy {
 
  private readonly _store: Store<SkinTypesState | QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroy$: Subject<void> = new Subject<void>();

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

    this._store.select(selectUserQuestionnaire).pipe(
      takeUntil(this._destroy$)
    ).subscribe({
      next: (data) => {
        if (data) {
          this.form.patchValue({
            diseaseThree: data.diseaseThree,
            skinShiny: data.skinShiny,
            skinType: data.skinType,
          });

          this.isValid.emit(true);
        }
      }
    });

    this.form.valueChanges.pipe(
      debounceTime(100),
      takeUntil(this._destroy$)
    ).subscribe((value) => {
      const disease = {
        diseaseThree: value.diseaseThree!,
        skinShiny: value.skinShiny!,
        skinType: value.skinType!
      }

      this._store.dispatch(saveDisease({ disease }));
    });
  }

  ngAfterContentChecked(): void {
    if (this.form.get('skinType')?.value) {
      this.isValid.emit(true);
    }
  }
  
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}