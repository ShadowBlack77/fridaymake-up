import { AfterContentChecked, AfterContentInit, Component, inject, OnDestroy, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime, Subject, takeUntil } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveAllergy } from "../../store/actions";
import { selectQuestionnaire, selectUserQuestionnaire } from "../../store/selectors";

@Component({
  selector: 'lib-allergy-step',
  templateUrl: './allergy-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: AllergyStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class AllergyStepComponent implements AfterContentInit, AfterContentChecked, OnDestroy {

  private readonly _store: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  readonly form = this._formBuilder.group({
    allergy: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    allergyIngredients: new FormControl('', {
      nonNullable: false,
    }),
    skinChanges: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    lenses: new FormControl(false, {
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
            allergy: data.allergy,
            allergyIngredients: data.allergyIngredients,
            skinChanges: data.skinChanges,
            lenses: data.lenses
          });
        }
      }
    });

    this.form.valueChanges.pipe(
      debounceTime(100),
      takeUntil(this._destroy$)
    ).subscribe((value) => {
      const allergy = {
        allergy: value.allergy!,
        allergyIngredients: value.allergyIngredients!,
        skinChanges: value.skinChanges!,
        lenses: value.lenses!
      }

      this._store.dispatch(saveAllergy({ allergy }));
    });
  }

  ngAfterContentChecked(): void {
    const allergy = {
      allergy: this.form.get('allergy')!.value!,
      allergyIngredients: this.form.get('allergyIngredients')!.value!,
      skinChanges: this.form.get('skinChanges')!.value!,
      lenses: this.form.get('lenses')!.value!
    }

    this._store.dispatch(saveAllergy({ allergy }));
    this.isValid.emit(true);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}