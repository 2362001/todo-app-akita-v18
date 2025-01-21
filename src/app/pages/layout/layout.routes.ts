import { Route } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

export const LAYOUT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent() {
      return import('../layout/layout.component').then((m) => m.LayoutComponent);
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'exercise', // Đặt route mặc định
        pathMatch: 'full', // Đảm bảo chỉ khớp chính xác đường dẫn trống
      },
      {
        path: 'exercise',
        loadComponent() {
          return import('../exercise/exercise.component').then((m) => m.ExerciseComponent);
        },
      },
      {
        path: 'results-exercise',
        loadComponent() {
          return import('../exercise/exercise.component').then((m) => m.ExerciseComponent);
        },
      },
      {
        path: 'testpaging',
        loadComponent() {
          return import('../test-paging-table/test-paging-table.component').then((m) => m.TestPagingTableComponent);
        },
      },
      {
        path: 'testcontrolaccessor',
        loadComponent() {
          return import('../test-control-value-accessor/test-control-value-accessor.component').then((m) => m.TestControlValueAccessorComponent);
        },
      },
    ],
  },
];
