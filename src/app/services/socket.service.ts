import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
      private apiUrl = environment.apiBaseUrl;
  
  private socket: Socket;
  private userId: string = '2'; 
  private trackingInterval: any;

  constructor() {
    // Connect to your backend
    this.socket = io(this.apiUrl, {
      transports: ['websocket']
    });
  }

  startTracking(taskId:any) {
    this.socket.emit('start-tracking', { taskId: taskId });

    this.trackingInterval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const timestamp = new Date().toISOString();

          this.socket.emit('send-location', { 
            taskId: taskId, 
            lat, 
            lng, 
            timestamp 
          });

          console.log('Sent location:', lat, lng);
        });
      }
    }, 15 * 1000); // every 15 sec
  }

  stopTracking() {
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
      this.trackingInterval = null;
    }
    this.socket.emit('stop-tracking', { userId: this.userId });
    console.log('Stopped tracking');
  }

    onLocationUpdate(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('location-update', (data) => {
        subscriber.next(data);
      });
    });
  }
}
