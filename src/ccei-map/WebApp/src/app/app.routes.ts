import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "map",
    loadComponent: () => import("./features/map/map").then((m) => m.Map),
  },
  {
    path: "**",
    redirectTo: "map",
  },
];
