import { animate, state, style, transition, trigger } from "@angular/animations";
import { AfterViewInit, Component, signal, WritableSignal } from "@angular/core";
import { PortfolioMasonaryComponent } from "@lib/fridaymake-up/portfolio";
import { FooterComponent } from "@lib/shared/footer";

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  imports: [
    FooterComponent,
    PortfolioMasonaryComponent
  ],
  animations: [
    trigger('fade-in-portfolio', [
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
export class PortfolioPageComponent implements AfterViewInit {
  
  protected readonly portfolioState: WritableSignal<string> = signal('hidden');

  ngAfterViewInit(): void {
    this.portfolioState.set('show');
  }
}