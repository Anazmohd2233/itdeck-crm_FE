import { NgClass, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Component, HostListener, ViewChild } from '@angular/core';
import { ToggleService } from '../sidebar/toggle.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { UsersService } from '../../services/users.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    MatSlideToggleChange,
    MatSlideToggleModule,
} from '@angular/material/slide-toggle';
// import { SocketService } from '../../services/socket.service';
import { GoogleMap } from '@angular/google-maps';

@Component({
    selector: 'app-header',
    imports: [
        NgClass,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        NgIf,
        MatFormFieldModule,
        MatSlideToggleModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    // isSidebarToggled
    isSidebarToggled = false;
    users: any;
        user_type: any;


    // isToggled
    isToggled = false;

    @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

    zoom = 14;
    center: google.maps.LatLngLiteral = { lat: 10.0, lng: 76.0 }; // default
    markers: any[] = [];
    path: google.maps.LatLngLiteral[] = [];

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private usersService: UsersService,
        // private socketService: SocketService,
        private router: Router
    ) {
        this.toggleService.isSidebarToggled$.subscribe((isSidebarToggled) => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
                this.user_type = localStorage.getItem('user_type');

        this.getProfile();
        // this.socketService.onLocationUpdate().subscribe((data) => {
        //     console.log('📍 New location:', data);

        //     const newPoint = { lat: +data.lat, lng: +data.lng };
        //     this.path.push(newPoint);

        //     // Add marker
        //     this.markers.push({
        //         position: newPoint,
        //         title: `User ${data.taskId} @ ${data.timestamp}`,
        //     });

        //     // Center map on new location
        //     this.center = newPoint;
        // });
    }

    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Header Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition =
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    private getProfile(): void {
        this.usersService.getProfile().subscribe({
            next: (response) => {
                if (response && response.success) {
                    this.users = response.data || [];
                } else {
                    // this.toastr.error('Failed to load users', 'Failed');
                    console.error('Failed to load profile:', response?.message);
                }
            },
            error: (error) => {
                console.error('API error:', error);
            },
        });
    }

    checkIn(): void {
        console.log('CheckIn');

        // this.socketService.startTracking();
    }

    checkOut(): void {
        console.log('Checkout');

        // this.socketService.stopTracking();
    }

    onLogout() {
        // 🟢 Example: Clear local storage/session
        localStorage.removeItem('token');
        localStorage.removeItem('user_type');

        localStorage.removeItem('super_admin');

        sessionStorage.clear();

        // 🟢 (Optional) Call API to invalidate session
        // this.authService.logout().subscribe(() => {
        //   this.router.navigate(['/authentication/logout']);
        // });

        // 🟢 Redirect after logout
        this.router.navigate(['/authentication/logout']);
    }
}
