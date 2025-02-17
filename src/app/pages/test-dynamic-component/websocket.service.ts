import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket$: WebSocketSubject<any>;

  constructor() {
    // Kết nối WebSocket
    this.socket$ = new WebSocketSubject('ws://localhost:8080');

    // Nhận tin nhắn từ WebSocket server
    this.socket$.subscribe({
      next: message => console.log('📩 Message from server:', message),
      error: err => console.error('❌ WebSocket error:', err),
      complete: () => console.log('⚠️ WebSocket connection closed'),
    });
  }

  // Gửi tin nhắn đến WebSocket server
  sendMessage(message: string) {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  // Đóng kết nối WebSocket
  closeConnection() {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
