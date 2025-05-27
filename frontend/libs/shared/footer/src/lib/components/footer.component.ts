import { CommonModule } from "@angular/common";
import { Component, input, InputSignal, Signal, signal, WritableSignal } from "@angular/core";

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
  imports: [
    CommonModule
  ]
})
export class FooterComponent {

  readonly footerStyle: InputSignal<'main' | 'dark'> = input<'main' | 'dark'>('main');
  protected readonly currentYear: Signal<number> = signal(new Date().getFullYear());
}