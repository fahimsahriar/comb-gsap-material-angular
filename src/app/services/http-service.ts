import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'https://official-joke-api.appspot.com/random_joke';
  private wsPpiUrl = 'wss://ws.bitmex.com/realtime';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getWebSocketData(): Observable<MessageEvent> {
    return new Observable((observer) => {
      const eventSource = new EventSource(this.wsPpiUrl);

      eventSource.onmessage = (event) => {
        observer.next(event);
      }

      eventSource.onerror = (e) => {
        observer.error(e);
        eventSource.close();
      }

      return () => {
        eventSource.close();
      }
    });
  }

  connect(url: string): Observable<any> {
    return new Observable(observer => {
      const ws = new WebSocket(url);

      ws.onopen = () => console.log('WS connected');
      ws.onmessage = (event) => observer.next(JSON.parse(event.data));
      ws.onerror = (err) => observer.error(err);
      ws.onclose = () => observer.complete();

      return () => ws.close();
    });
  }
}
