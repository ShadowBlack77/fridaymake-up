import { Routes } from '@angular/router';
import { SkinTypesResolver } from '@lib/fridaymake-up/informations';
import { PriceListResolver } from '@lib/fridaymake-up/price-list';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@lib/fridaymake-up/layouts').then((c) => c.RootLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home-page.component').then((c) => c.HomePageComponent)
      },
      {
        path: 'price-list',
        resolve: [
          PriceListResolver
        ],
        loadComponent: () => import('./pages/price-list/price-list-page.component').then((c) => c.PriceListPage)
      },
      {
        path: 'portfolio',
        loadComponent: () => import('./pages/portfolio/portfolio-page.component').then((c) => c.PortfolioPageComponent)
      },
      {
        path: 'certificates',
        loadComponent: () => import('./pages/certificates/certificates-page.component').then((c) => c.CertificatesPageComponent)
      },
      {
        path: 'informations',
        resolve: [
          SkinTypesResolver
        ],
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
        loadComponent: () => import('./pages/profile/profile-page.component').then((c) => c.ProfilePageComponent)
      },
      {
        path: 'questionnaire',
        loadComponent: () => import('./pages/questionnaire/questionnaire-form/questionnaire-form-page.component').then((c) => c.QuestionnaireFormPageComponent)
      }
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('@lib/fridaymake-up/layouts').then((c) => c.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login-page/login-page.component').then((c) => c.LoginPageComponent)
      }
    ]
  }
];
