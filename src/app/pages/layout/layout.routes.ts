import { Route } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

export const LAYOUT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent() {
      return import('../layout/layout.component').then((m) => m.LayoutComponent)
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'exercise',
        loadComponent() {
          return import('../exercise/exercise.component').then((m) => m.ExerciseComponent)
        }
      },
      {
        path: 'results-exercise',
        loadComponent() {
          return import('../exercise/exercise.component').then((m) => m.ExerciseComponent)
        }
      },
      {
        path: 'setting',
        loadComponent() {
          return import('../exercise/exercise.component').then((m) => m.ExerciseComponent)
        }
      }
    ]
  }
]
