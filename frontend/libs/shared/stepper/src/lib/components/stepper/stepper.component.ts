import { AfterContentInit, Component, computed, contentChildren, effect, OnDestroy, output, OutputEmitterRef, Signal, signal, WritableSignal } from "@angular/core";
import { StepComponent } from "../step/step.component";
import { Subject } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'lib-stepper',
  templateUrl: './stepper.component.html',
  imports: [
    CommonModule
  ]
})
export class StepperComponent implements AfterContentInit, OnDestroy {

  private readonly _steps = contentChildren(StepComponent, { descendants: true });
  private readonly _destroy$: Subject<void> = new Subject<void>();

  readonly submitEmmiter: OutputEmitterRef<void> = output<void>();

  protected readonly currentStep: WritableSignal<number> = signal(0);
  protected readonly stepsCount: WritableSignal<number> = signal(0);
  protected readonly isStepValid: Signal<boolean> = computed(() => {
    return this._steps()[this.currentStep()].isValid();
  });

  constructor() {
    effect(() => {
      this._steps().map((step) => {
        step.isActive.set(false);
      })
      
      this._steps()[this.currentStep()].isActive.set(true);
    });
  }

  ngAfterContentInit(): void {
    this.stepsCount.set(this._steps().length);
  }

  next(): void {
    if (this.currentStep() < this.stepsCount()) {
      this.currentStep.update((prev) => prev += 1);
    }
  }

  prev(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update((prev) => prev -= 1);
    }
  }

  submit(): void {
    this.submitEmmiter.emit();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}