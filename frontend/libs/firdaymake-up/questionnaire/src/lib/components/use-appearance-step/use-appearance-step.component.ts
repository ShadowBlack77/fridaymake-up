import { AfterContentChecked, AfterContentInit, Component, inject, OnDestroy, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime, Subject, takeUntil } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveUseAppearance } from "../../store/actions";
import { selectUserQuestionnaire } from "../../store/selectors";

@Component({
  selector: 'lib-use-appearance-step',
  templateUrl: './use-appearance-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: UseAppearanceStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class UseAppearanceStepComponent implements AfterContentInit, AfterContentChecked, OnDestroy {

  private readonly _store: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  readonly form = this._formBuilder.group({
    useAppearance: new FormControl(false, {
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
            useAppearance: data.useAppearance
          });
        }
      }
    });

    this.form.valueChanges.pipe(
      debounceTime(100),
      takeUntil(this._destroy$)
    ).subscribe((value) => {
      const useAppearance = {
        useAppearance: value.useAppearance!
      }

      this._store.dispatch(saveUseAppearance({ useAppearance }));
    });
  }

  ngAfterContentChecked(): void {
    const useAppearance = {
      useAppearance: this.form.get('useAppearance')?.value!
    };

    this._store.dispatch(saveUseAppearance({ useAppearance }));
    this.isValid.emit(true);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}