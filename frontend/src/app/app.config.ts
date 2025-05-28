import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ENVIRONMENTS_TOKEN } from '@lib/core/environments';
import { Environments } from '../environments/environments';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthService, RefreshInterceptors } from '@lib/auth';
import { PriceListEffects, priceListReducer } from '@lib/fridaymake-up/price-list';
import { SkinTypesEffects, skinTypesReducer } from '@lib/fridaymake-up/informations';
import { provideCloudinaryLoader } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { QuestionnaireEffects, questionnaireReducer } from '@lib/fridaymake-up/questionnaire';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()),
    provideCloudinaryLoader('https://res.cloudinary.com/dfv7maike'),
    provideAnimationsAsync(),
    provideStore({
      priceList: priceListReducer,
      skinTypes: skinTypesReducer,
      questionniare: questionnaireReducer
    }), 
    provideEffects([
      PriceListEffects,
      SkinTypesEffects,
      QuestionnaireEffects
    ]),
    {
      provide: ENVIRONMENTS_TOKEN,
      useValue: {
        apiUrl: Environments.apiUrl,
        apiKey: Environments.apiKey
      }
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => {
        return () => authService.init();
      },
      multi: true,
      deps: [AuthService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshInterceptors,
      multi: true
    }
  ]
};
