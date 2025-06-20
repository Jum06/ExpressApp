import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private ws: WebSocket;
  private productUpdates$ = new Subject<any>();

  constructor() {
    this.ws = new WebSocket('ws://localhost:3001');
    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'PRODUCT_UPDATE') {
          this.productUpdates$.next(msg.data);
        }
      } catch (e) {
        // Ignore non-JSON messages (like the welcome string)
      }
    };
  }

  getProductUpdates(): Observable<any> {
    return this.productUpdates$.asObservable();
  }
}
