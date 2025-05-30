import { AfterContentChecked, AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveMakeUp } from "../../store/actions";

@Component({
  selector: 'lib-make-up-step',
  templateUrl: './make-up-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: MakeUpStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class MakeUpStepComponent implements AfterContentInit, AfterContentChecked {

  private readonly _store: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);

  readonly form = this._formBuilder.group({
    expectedEffect: new FormControl('', {
      nonNullable: false,
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
      const makeUp = {
        expectedEffect: value.expectedEffect!
      }

      this._store.dispatch(saveMakeUp({ makeUp }));
    });
  }

  ngAfterContentChecked(): void {
    const makeUp = {
      expectedEffect: this.form.get('expectedEffect')!.value!
    }

    this._store.dispatch(saveMakeUp({ makeUp }));
    this.isValid.emit(true);
  }
}