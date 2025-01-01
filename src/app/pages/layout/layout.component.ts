import { Component } from '@angular/core'
import { SharedModule } from '../../common/common.module'
import { Router } from '@angular/router'

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [SharedModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private router: Router) {}
  isCollapsed = false
  menu: any[] = [
    {
      value: '/dashboard',
      title: 'Dashboard',
      icon: 'dashboard',
      children: [
        {
          value: 'exercise',
          title: 'Exercise'
        },
        {
          value: 'monitor',
          title: 'Monitor'
        },
        {
          value: 'workplace',
          title: 'Workplace'
        },
        {
          value: 'testpaging',
          title: 'Paging'
        }
      ]
    },
    {
      value: '/form',
      title: 'Form',
      icon: 'form',
      children: [
        {
          value: '/basic-form',
          title: 'Basic Form'
        }
      ]
    }
  ]

  onLogout() {
    localStorage.removeItem('user_credentials')
    this.router.navigate(['/auth/login'])
  }
}
