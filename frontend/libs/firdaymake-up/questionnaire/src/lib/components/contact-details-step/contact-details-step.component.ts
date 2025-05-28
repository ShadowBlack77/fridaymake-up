import { CommonModule } from "@angular/common";
import { AfterContentInit, Component, inject, output, OutputEmitterRef } from "@angular/core";
import { FormBuilder, FormControl, FormControlStatus, ReactiveFormsModule, Validators } from "@angular/forms";
import { STEP_VALIDATION } from "@lib/core/tokens";
import { PriceListState, selectPriceList } from "@lib/fridaymake-up/price-list";
import { Store } from "@ngrx/store";
import { debounceTime } from "rxjs";
import { QuestionnaireState } from "../../store/reducer";
import { saveContactDetails } from "../../store/actions";

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
export class ContactDetailsStepComponent implements AfterContentInit {

  private readonly _servicesStore: Store<PriceListState> = inject(Store);
  private readonly _questionnaireStore: Store<QuestionnaireState> = inject(Store);
  private readonly _formBuilder = inject(FormBuilder);

  protected readonly services$ = this._servicesStore.select(selectPriceList);

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

    this.form.valueChanges.pipe(
      debounceTime(100)
    ).subscribe((value) => {
      const contactDetails = {
        email: value.email!,
        name: value.name!,
        phoneNumber: value.phoneNumber!,
        service: value.service!
      }
      
      this._questionnaireStore.dispatch(saveContactDetails({ contactDetails }));
    });
  }
}