import { AfterContentChecked, AfterContentInit, Component, inject, OnDestroy, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { debounceTime, Subject, take, takeUntil } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { Store } from "@ngrx/store";
import { savePores } from "../../store/actions";
import { selectQuestionnaire, selectUserQuestionnaire } from "../../store/selectors";

@Component({
  selector: 'lib-pores-step',
  templateUrl: './pores-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: PoresStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class PoresStepComponent implements AfterContentInit, AfterContentChecked, OnDestroy {

  private readonly _store: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  readonly form = this._formBuilder.group({
    pores: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    medicines: new FormControl(false, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    skinDiseases: new FormControl(false, {
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
            pores: data.pores,
            medicines: data.medicines,
            skinDiseases: data.skinDiseases,
          });
        }
      }
    });

    this.form.valueChanges.pipe(
      debounceTime(100),
      takeUntil(this._destroy$)
    ).subscribe((value) => {
      const pores = {
        pores: value.pores!,
        medicines: value.medicines!,
        skinDiseases: value.skinDiseases!
      }

      this._store.dispatch(savePores({ pores }));
    });
  }

  ngAfterContentChecked(): void {
    const pores = {
      pores: this.form.get('pores')!.value!,
      medicines: this.form.get('medicines')!.value!,
      skinDiseases: this.form.get('skinDiseases')!.value!
    }

    this._store.dispatch(savePores({ pores }));
    this.isValid.emit(true);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}