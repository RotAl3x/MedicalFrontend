import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private socket: WebSocket| undefined;
  messageReceived: Subject<string> = new Subject<string>();

  socketServer1 = 'ws://localhost:8181';
  constructor() { }

  connect(): void {
    this.socket = new WebSocket(this.socketServer1);

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      const message = event.data;
      console.log('Received message:', message);
      this.messageReceived.next(`RECEIVE: ${message}`);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      this.messageReceived.next(`WebSocket connection closed:`);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.messageReceived.next(`WebSocket error`);
    };
  }

  sendMessage(message: string): void {
    this.socket?.send(message);
    this.messageReceived.next(`SEND: ${message}`);
  }

  closeConnection(): void {
    this.socket?.close();
  }
}
