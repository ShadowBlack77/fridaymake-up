import { animate, state, style, transition, trigger } from "@angular/animations";
import { AfterViewInit, Component, signal, WritableSignal } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'lib-auth-layout',
  templateUrl: './auth-layout.component.html',
  imports: [RouterOutlet],
    animations: [
    trigger('fade-in-auth', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s ease-in')
      ])
    ]),
  ]
})
export class AuthLayoutComponent implements AfterViewInit {

  protected readonly authState: WritableSignal<string> = signal('hidden');

  ngAfterViewInit(): void {
    this.authState.set('show');
  }
}