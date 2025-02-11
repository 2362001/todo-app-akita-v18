import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-widget',
  imports: [],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',

})
export class WidgetComponent {
  title = input("__Widget__");
  description = input("__Widget description__");

  closed = output<void>();
}
