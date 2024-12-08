import { Route } from '@angular/router'

export const AUTH_ROUTES: Route[] = [
  {
    path: 'login',
    loadComponent() {
      return import('./login/login.component').then((m) => m.LoginComponent)
    }
  },
  {
    path: 'register',
    loadComponent() {
      return import('./register/register.component').then((m) => m.RegisterComponent)
    }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
]
