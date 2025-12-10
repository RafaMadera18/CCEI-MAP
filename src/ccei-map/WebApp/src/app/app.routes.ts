import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () =>
      import('./presentation/pages/main/main').then((m) => m.Main),
  },
  {
    path: 'buldings',
    loadComponent: () =>
      import('./presentation/pages/buildings/buldings').then(
        (m) => m.Buldings,
      ),
  },
  {
    path: 'help',
    loadComponent: () =>
      import('./presentation/pages/help/help').then((m) => m.HelpPage),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
