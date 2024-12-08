import { Component } from '@angular/core';
import { SharedModule } from '../../common/common.module';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [SharedModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
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
