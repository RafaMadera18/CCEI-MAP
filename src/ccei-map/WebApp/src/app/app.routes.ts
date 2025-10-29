import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'map',
    loadComponent: () => import('./features/map/map').then((m) => m.Map),
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./features/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'buldings',
    loadComponent: () =>
      import('./features/buldings/buldings').then((m) => m.Buldings),
  },
  {
    path: 'buldings/:id',
    loadComponent: () =>
      import('./features/spaces-buildings/spaces-buildings').then(
        (m) => m.SpacesBuildings,
      ),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
