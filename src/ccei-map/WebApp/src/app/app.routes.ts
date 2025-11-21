import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () =>
      import('./features/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'buldings',
    loadComponent: () =>
      import('./features/buildings/presentation/page/buldings').then(
        (m) => m.Buldings,
      ),
  },
  {
    path: 'buldings/:id',
    loadComponent: () =>
      import(
        './features/spaces-buildings/presentation/page/spaces-buildings'
      ).then((m) => m.SpacesBuildings),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
