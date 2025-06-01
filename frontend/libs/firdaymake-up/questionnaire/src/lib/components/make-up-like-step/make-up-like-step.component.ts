import { AfterContentChecked, AfterContentInit, Component, inject, OnDestroy, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { Store } from "@ngrx/store";
import { debounceTime, Subject, takeUntil } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveMakeUpLike } from "../../store/actions";
import { selectUserQuestionnaire } from "../../store/selectors";

@Component({
  selector: 'lib-make-up-like-step',
  templateUrl: './make-up-like-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: MakeUpLikeStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule
  ]
})
export class MakeUpLikeStepComponent implements AfterContentInit, AfterContentChecked, OnDestroy {

  private readonly _store: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  readonly form = this._formBuilder.group({
    makeupLike: new FormControl('', {
      nonNullable: false,
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
            makeupLike: data.makeUp
          });
        }
      }
    });

    this.form.valueChanges.pipe(
      debounceTime(100),
      takeUntil(this._destroy$)
    ).subscribe((value) => {
      const makeUpLike = {
        makeUp: value.makeupLike!
      }

      this._store.dispatch(saveMakeUpLike({ makeUpLike }))
    });
  }

  ngAfterContentChecked(): void {
    const makeUpLike = {
      makeUp: this.form.get('makeupLike')?.value!
    }

    this._store.dispatch(saveMakeUpLike({ makeUpLike }));
    this.isValid.emit(true);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}