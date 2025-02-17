import { Component, ComponentRef, ElementRef, inject, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { WidgetComponent } from './widget/widget.component';
import { WeatherContentComponent } from './widget/weather-content.component';
import { WebsocketService } from './websocket.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../common/common.module';

@Component({
  selector: 'app-test-dynamic-component',
  templateUrl: './test-dynamic-component.component.html',
  styleUrl: './test-dynamic-component.component.scss',
  imports: [WeatherContentComponent, SharedModule , FormsModule]
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

  messageToSend: string = '';

  constructor(private wsService: WebsocketService) {}

  sendMessage() {
    if (this.messageToSend.trim()) {
      this.wsService.sendMessage(this.messageToSend);
      this.messageToSend = ''; // Xóa input sau khi gửi
    }
  }

  closeConnection() {
    this.wsService.closeConnection();
  }
}
