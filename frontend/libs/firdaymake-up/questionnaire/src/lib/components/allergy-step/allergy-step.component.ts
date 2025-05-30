import { AfterContentChecked, AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveAllergy } from "../../store/actions";

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
export class AllergyStepComponent implements AfterContentInit, AfterContentChecked {

  private readonly _questionnaireStore: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);

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

    this.form.valueChanges.pipe(
      debounceTime(100)
    ).subscribe((value) => {
      const allergy = {
        allergy: value.allergy!,
        allergyIngredients: value.allergyIngredients!,
        skinChanges: value.skinChanges!,
        lenses: value.lenses!
      }

      this._questionnaireStore.dispatch(saveAllergy({ allergy }));
    });
  }

  ngAfterContentChecked(): void {
    const allergy = {
      allergy: this.form.get('allergy')!.value!,
      allergyIngredients: this.form.get('allergyIngredients')!.value!,
      skinChanges: this.form.get('skinChanges')!.value!,
      lenses: this.form.get('lenses')!.value!
    }

    this._questionnaireStore.dispatch(saveAllergy({ allergy }));
    this.isValid.emit(true);
  }
}