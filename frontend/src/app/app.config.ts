import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ENVIRONMENTS_TOKEN } from '@lib/core/environments';
import { Environments } from '../environments/environments';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '@lib/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideStore(), 
    provideEffects(),
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
    }
  ]
};
