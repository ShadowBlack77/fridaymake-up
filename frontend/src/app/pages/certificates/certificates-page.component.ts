import { animate, state, style, transition, trigger } from "@angular/animations";
import { AfterViewInit, Component, signal, WritableSignal } from "@angular/core";
import { CertificatesMasonaryComponent } from "@lib/fridaymake-up/certificates";
import { FooterComponent } from "@lib/shared/footer";

@Component({
  selector: 'app-certificates-page',
  templateUrl: './certificates-page.component.html',
  imports: [
    FooterComponent,
    CertificatesMasonaryComponent
  ],
  animations: [
    trigger('fade-in-certificates', [
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
export class CertificatesPageComponent implements AfterViewInit {

  protected readonly certificatesState: WritableSignal<string> = signal('hidden');

  ngAfterViewInit(): void {
    this.certificatesState.set('show');
  }
}