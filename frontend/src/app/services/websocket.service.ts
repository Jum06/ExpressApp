import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private ws!: WebSocket;
  private stockUpdates$ = new Subject<any>();

  constructor(private ngZone: NgZone) {
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket('ws://localhost:3001');
    this.ws.onmessage = (event) => {
      this.ngZone.run(() => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'stockUpdate') {
            this.stockUpdates$.next(data);
          }
        } catch {}
      });
    };
    this.ws.onerror = (err) => {
      // handle error if needed
    };
  }

  getStockUpdates(): Observable<any> {
    return this.stockUpdates$.asObservable();
  }
}
