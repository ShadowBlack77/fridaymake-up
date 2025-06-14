import { Routes } from '@angular/router';
import { AuthGuard, ProtectGuard } from '@lib/auth';
import { SkinTypesResolver } from '@lib/fridaymake-up/informations';
import { PortfolioResolver } from '@lib/fridaymake-up/portfolio';
import { PriceListResolver } from '@lib/fridaymake-up/price-list';
import { CertificatesResolver } from '../../libs/firdaymake-up/certificates/src/lib/resolver/certificates.resolver';
import { QuestionnaireResolver } from '@lib/fridaymake-up/questionnaire';

export const routes: Routes = [
  {
    path: '',
    resolve: [
      QuestionnaireResolver
    ],
    loadComponent: () => import('@lib/fridaymake-up/layouts').then((c) => c.RootLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home-page.component').then((c) => c.HomePageComponent)
      },
      {
        path: 'price-list',
        resolve: [PriceListResolver],
        loadComponent: () => import('./pages/price-list/price-list-page.component').then((c) => c.PriceListPage)
      },
      {
        path: 'portfolio',
        resolve: [PortfolioResolver],
        loadComponent: () => import('./pages/portfolio/portfolio-page.component').then((c) => c.PortfolioPageComponent)
      },
      {
        path: 'certificates',
        resolve: [CertificatesResolver],
        loadComponent: () => import('./pages/certificates/certificates-page.component').then((c) => c.CertificatesPageComponent)
      },
      {
        path: 'informations',
        resolve: [SkinTypesResolver],
        loadComponent: () => import('./pages/informations/informations-page.component').then((c) => c.InformationsPageComponent)
      },
      {
        path: 'statute',
        loadComponent: () => import('./pages/statute/statute-page.component').then((c) => c.StatutePageComponent)
      },
      {
        path: 'faqs',
        loadComponent: () => import('./pages/faqs/faqs-page.component').then((c) => c.FaqsPageComponent)
      },
      {
        path: 'profile',
        canActivate: [ProtectGuard],
        loadComponent: () => import('./pages/profile/profile-page.component').then((c) => c.ProfilePageComponent)
      },
      {
        path: 'questionnaire',
        canActivate: [ProtectGuard],
        resolve: [
          PriceListResolver,
          SkinTypesResolver
        ],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/questionnaire/questionnaire-form/questionnaire-form-page.component').then((c) => c.QuestionnaireFormPageComponent)
          },
          {
            path: ':questionnaireId',
            loadComponent: () => import('./pages/questionnaire/selected-questionnaire/selected-questionnaire-page.component').then((c) => c.SelectedQuestionnairePageComponent)
          }
        ]
      },
    ]
  },
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadComponent: () => import('@lib/fridaymake-up/layouts').then((c) => c.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login-page/login-page.component').then((c) => c.LoginPageComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register-page/register-page.component').then((c) => c.RegisterPageComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./pages/auth/reset-password-page/reset-password-page.component').then((c) => c.ResetPasswordPageComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found-page.component').then((c) => c.NotFoundPageComponent)
  }
];
