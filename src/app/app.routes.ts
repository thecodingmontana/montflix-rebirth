import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'tv/:id',
    loadComponent: () => import('./tv/tv.component').then((m) => m.TvComponent),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./movie/movie.component').then((m) => m.MovieComponent),
  },
  {
    path: 'person/:id',
    loadComponent: () =>
      import('./person/person.component').then((m) => m.PersonComponent),
  },
];
