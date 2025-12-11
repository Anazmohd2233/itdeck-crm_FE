import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SocketService {
    private apiUrl = environment.apiBaseUrl;
    private socket?: Socket;
    private trackingInterval: any;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.socket = io(this.apiUrl, { transports: ['websocket'] });

            this.socket.on('connect', () => {
                console.log('ƒo. Connected to socket server:', this.socket?.id);
            });

            this.socket.on('connect_error', (err) => {
                console.error('ƒ?O Socket connection error:', err.message);
            });
        }
    }

    startTracking(userId: string) {
        if (!this.socket) {
            return;
        }

        console.log('ƒz­‹,? startTracking called for user:', userId);

        // ƒo. Notify backend check-in
        this.socket.emit('start-tracking', { userId });

        this.trackingInterval = setInterval(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const timestamp = new Date().toISOString();

                    // ƒo. Send live location
                    this.socket?.emit('send-location', {
                        userId,
                        lat,
                        lng,
                        timestamp,
                    });
                    console.log('Sent location:', lat, lng);
                });
            }
        }, 2 * 60 * 1000); // every 2 minutes
    }

    stopTracking(userId: string) {
        if (!this.socket) {
            return;
        }

        if (this.trackingInterval) {
            clearInterval(this.trackingInterval);
            this.trackingInterval = null;
        }

        // ƒo. Notify backend checkout
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const timestamp = new Date().toISOString();
                this.socket?.emit('stop-tracking', {
                    userId,
                    lat,
                    lng,
                    timestamp,
                });
                console.log('Stopped tracking:', lat, lng);
            });
        }
    }
}
