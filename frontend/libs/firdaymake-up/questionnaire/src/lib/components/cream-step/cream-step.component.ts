import { AfterContentChecked, AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveCream } from "../../store/actions";

@Component({
  selector: 'lib-cream-step',
  templateUrl: './cream-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: CreamStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class CreamStepComponent implements AfterContentInit, AfterContentChecked {
  
  private readonly _store: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);

  readonly form = this._formBuilder.group({
    cream: new FormControl('', {
      nonNullable: false
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
      const cream = {
        cream: value.cream!
      }

      this._store.dispatch(saveCream({ cream }));
    });
  }

  ngAfterContentChecked(): void {
    const cream = {
      cream: this.form.get('cream')?.value!
    };

    this._store.dispatch(saveCream({ cream }));
    this.isValid.emit(true);
  }
}