import { AfterContentChecked, AfterContentInit, Component, inject, OnDestroy, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime, Subject, takeUntil } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveIngredients } from "../../store/actions";
import { selectUserQuestionnaire } from "../../store/selectors";

@Component({
  selector: 'lib-ingredients-step',
  templateUrl: './ingredients-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: IngredientsStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class IngredientsStepComponent implements AfterContentInit, AfterContentChecked, OnDestroy {

  private readonly _store: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  readonly form = this._formBuilder.group({
    cosmeticIngredients: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    whichIngredients: new FormControl('', {
      nonNullable: false,
    }),
    diseaseOne: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    diseaseTwo: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
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
            cosmeticIngredients: data.cosmeticsIngredients,
            whichIngredients: data.whichIngredients,
            diseaseOne: data.diseaseOne,
            diseaseTwo: data.diseaseTwo
          });
        }
      }
    });

    this.form.valueChanges.pipe(
      debounceTime(100),
      takeUntil(this._destroy$)
    ).subscribe((value) => {
      const ingredients = {
        cosmeticsIngredients: value.cosmeticIngredients!,
        whichIngredients: value.whichIngredients!,
        diseaseOne: value.diseaseOne!,
        diseaseTwo: value.diseaseTwo!
      }

      this._store.dispatch(saveIngredients({ ingredients }));
    });
  }

  ngAfterContentChecked(): void {
    const ingredients = {
      cosmeticsIngredients: this.form.get('cosmeticIngredients')!.value!,
      whichIngredients: this.form.get('whichIngredients')!.value!,
      diseaseOne: this.form.get('diseaseOne')!.value!,
      diseaseTwo: this.form.get('diseaseTwo')!.value!
    }

    this._store.dispatch(saveIngredients({ ingredients }));
    this.isValid.emit(true);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}