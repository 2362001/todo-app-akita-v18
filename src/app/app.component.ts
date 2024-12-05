import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  menu: any[] = [
    {
      value: "/dashboard",
      title: "Dashboard",
      icon: "dashboard",
      children: [
        {
          value: "/welcome",
          title: "Welcome1",
        },
        {
          value: "/monitor",
          title: "Monitor",
        },
        {
          value: "/workplace",
          title: "Workplace",
        },
      ],
    },
    {
      value: "/form",
      title: "Form",
      icon: "form",
      children: [
        {
          value: "/basic-form",
          title: "Basic Form",
        },
      ],
    },
  ];
  
}
