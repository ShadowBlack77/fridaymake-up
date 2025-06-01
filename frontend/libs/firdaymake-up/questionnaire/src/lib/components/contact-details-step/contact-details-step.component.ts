import { CommonModule } from "@angular/common";
import { AfterContentChecked, AfterContentInit, Component, inject, OnDestroy, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { PriceListState, selectPriceList } from "@lib/fridaymake-up/price-list";
import { Store } from "@ngrx/store";
import { debounceTime, Subject, take, takeUntil } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveContactDetails } from "../../store/actions";
import { selectQuestionnaire, selectUserQuestionnaire } from "../../store/selectors";

@Component({
  selector: 'lib-contact-details-step',
  templateUrl: './contact-details-step.component.html',
  providers: [
    {
      provide: STEP_VALIDATION,
      useExisting: ContactDetailsStepComponent
    }
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ContactDetailsStepComponent implements AfterContentInit, AfterContentChecked, OnDestroy {

  private readonly _store: Store<PriceListState | QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  protected readonly services$ = this._store.select(selectPriceList);

  readonly form = this._formBuilder.group({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    phoneNumber: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    service: new FormControl('', {
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
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            service: data.service
          });
        }
      }
    });

    this.form.valueChanges.pipe(
      debounceTime(100),
      takeUntil(this._destroy$)
    ).subscribe((value) => {
      const contactDetails = {
        email: value.email!,
        name: value.name!,
        phoneNumber: value.phoneNumber!,
        service: value.service!
      }
      
      this._store.dispatch(saveContactDetails({ contactDetails }));
    });
  }

  ngAfterContentChecked(): void {
    if (this.form.get('service')?.value) {
      this.isValid.emit(true);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}