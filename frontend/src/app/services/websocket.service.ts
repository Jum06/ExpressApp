// frontend/src/app/websocket.service.ts
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:3000'); // Replace with your backend URL
  }

  getProductUpdates(): Observable<any> {
    return this.socket$.asObservable();
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }
}
