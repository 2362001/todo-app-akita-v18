import { Component, ComponentRef, ElementRef, inject, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { WidgetComponent } from './widget/widget.component';
import { WeatherContentComponent } from './widget/weather-content.component';

@Component({
  selector: 'app-test-dynamic-component',
  templateUrl: './test-dynamic-component.component.html',
  styleUrl: './test-dynamic-component.component.scss',
  imports: [WeatherContentComponent]
})

export class TestDynamicComponentComponent {
  vcr = viewChild('container', { read: ViewContainerRef });

  content= viewChild<TemplateRef<unknown>>('content')
  #componentRef?: ComponentRef<WidgetComponent>;

  createComponent() {
    this.vcr()?.clear();

    const contentView = this.vcr()?.createEmbeddedView(this.content()!); 

    this.#componentRef = this.vcr()?.createComponent(WidgetComponent , {
      projectableNodes: [[
        contentView?.rootNodes as any
      ]],
    });

    this.#componentRef?.setInput('title', 'Title');

    this.#componentRef?.setInput('description', 'Description');

    this.#componentRef?.instance.closed.subscribe(() => {
      this.#componentRef?.destroy();
    });
    
  }

  destroyComponent() {
    this.vcr()?.clear();
  }
}
