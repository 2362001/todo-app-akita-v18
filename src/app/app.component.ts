import { Component } from '@angular/core';
import { SharedModule } from './common/common.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
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
