import { AfterContentChecked, AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveIngredients } from "../../store/actions";

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
export class IngredientsStepComponent implements AfterContentInit, AfterContentChecked {

  private readonly _questionnaireStore: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);

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

    this.form.valueChanges.pipe(
      debounceTime(100)
    ).subscribe((value) => {
      const ingredients = {
        cosmeticsIngredients: value.cosmeticIngredients!,
        whichIngredients: value.whichIngredients!,
        diseaseOne: value.diseaseOne!,
        diseaseTwo: value.diseaseTwo!
      }

      this._questionnaireStore.dispatch(saveIngredients({ ingredients }));
    });
  }

  ngAfterContentChecked(): void {
    const ingredients = {
      cosmeticsIngredients: this.form.get('cosmeticIngredients')!.value!,
      whichIngredients: this.form.get('whichIngredients')!.value!,
      diseaseOne: this.form.get('diseaseOne')!.value!,
      diseaseTwo: this.form.get('diseaseTwo')!.value!
    }

    this._questionnaireStore.dispatch(saveIngredients({ ingredients }));
    this.isValid.emit(true);
  }
}