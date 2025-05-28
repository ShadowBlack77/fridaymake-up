import { NgOptimizedImage } from "@angular/common";
import { AfterViewInit, Component, signal, WritableSignal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FooterComponent } from "@lib/shared/footer";
import { InViewportDirective } from "@lib/shared/animations";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthActionsComponent } from "@lib/auth";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    RouterLink,
    InViewportDirective,
    NgOptimizedImage,
    FooterComponent,
    AuthActionsComponent
  ],
  animations: [
    trigger('fade-in-hero', [
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
    trigger('fade-in-feature-one', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s .5s ease-in')
      ])
    ]),
    trigger('fade-in-feature-two', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s 1s ease-in')
      ])
    ]),
    trigger('fade-in-feature-three', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s 1.5s ease-in')
      ])
    ]),
    trigger('fade-in-about-me', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s .5s ease-in')
      ])
    ]),
    trigger('fade-in-service-one', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s .5s ease-in')
      ])
    ]),
    trigger('fade-in-service-two', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s 1s ease-in')
      ])
    ]),
    trigger('fade-in-service-three', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s 1.5s ease-in')
      ])
    ]),
     trigger('fade-in-cta', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s .5s ease-in')
      ])
    ]),
  ]
})
export class HomePageComponent implements AfterViewInit {

  protected readonly heroState: WritableSignal<string> = signal<string>('hidden');
  protected readonly featureOneState: WritableSignal<string> = signal<string>('hidden');
  protected readonly featureTwoState: WritableSignal<string> = signal<string>('hidden');
  protected readonly featureThreeState: WritableSignal<string> = signal<string>('hidden');
  protected readonly aboutMeState: WritableSignal<string> = signal<string>('hidden');
  protected readonly serviceOneState: WritableSignal<string> = signal<string>('hidden');
  protected readonly serviceTwoState: WritableSignal<string> = signal<string>('hidden');
  protected readonly serviceThreeState: WritableSignal<string> = signal<string>('hidden');
  protected readonly ctaState: WritableSignal<string> = signal<string>('hidden');

  ngAfterViewInit(): void {
    this.heroState.set('show');
    this.featureOneState.set('show');
    this.featureTwoState.set('show');
    this.featureThreeState.set('show');
  }

  aboutMeInView(): void {
    this.aboutMeState.set('show');
  }

  servicesInView(): void {
    this.serviceOneState.set('show');
    this.serviceTwoState.set('show');
    this.serviceThreeState.set('show');
  }

  ctaInView(): void {
    this.ctaState.set('show');
  }
}