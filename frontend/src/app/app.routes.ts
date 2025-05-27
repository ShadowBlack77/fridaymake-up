import { Routes } from '@angular/router';
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
        loadComponent: () => import('./pages/informations/informations-page.component').then((c) => c.InformationsPageComponent)
      },
      {
        path: 'statute',
        loadComponent: () => import('./pages/statute/statute-page.component').then((c) => c.StatutePageComponent)
      },
      {
        path: 'faqs',
        loadComponent: () => import('./pages/faqs/faqs-page.component').then((c) => c.FaqsPageComponent)
      }
    ]
  }
];
