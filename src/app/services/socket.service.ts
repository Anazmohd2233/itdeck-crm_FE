import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private apiUrl = environment.apiBaseUrl;
  private socket: Socket;
  private trackingInterval: any;

constructor() {
  this.socket = io(this.apiUrl, { transports: ['websocket'] });

  this.socket.on("connect", () => {
    console.log("✅ Connected to socket server:", this.socket.id);
  });

  this.socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
  });
}


  startTracking(userId: string) {
      console.log("➡️ startTracking called for user:", userId);

    // ✅ Notify backend check-in
    this.socket.emit('start-tracking', { userId });

    this.trackingInterval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const timestamp = new Date().toISOString();

          // ✅ Send live location
          this.socket.emit('send-location', { userId, lat, lng, timestamp });
          console.log('Sent location:', lat, lng);
        });
      }
}, 2 * 60 * 1000); // every 2 minutes
  }

  stopTracking(userId: string) {
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
      this.trackingInterval = null;
    }

    // ✅ Notify backend checkout
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const timestamp = new Date().toISOString();
        this.socket.emit('stop-tracking', { userId, lat, lng, timestamp });
        console.log('Stopped tracking:', lat, lng);
      });
    }
  }
}
