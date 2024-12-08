import { Route } from '@angular/router'

export const LAYOUT_ROUTES: Route[] = [
    {
        path: 'excercise',
        loadComponent() {
          return import('../exercise/exercise.component').then((m) => m.ExerciseComponent)
        }
      },
]

