import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () =>
      import('@pages/main/main').then((m) => m.Main),
  },
  {
    path: 'buldings',
    loadComponent: () =>
      import('./presentation/pages/buildings/buldings').then(
        (m) => m.Buldings,
      ),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
