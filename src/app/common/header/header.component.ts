import { NgClass, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Component, HostListener } from '@angular/core';
import { ToggleService } from '../sidebar/toggle.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { UsersService } from '../../services/users.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-header',
    imports: [
        NgClass,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        NgIf,
        MatFormFieldModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    // isSidebarToggled
    isSidebarToggled = false;
    users: any;

    // isToggled
    isToggled = false;

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private usersService: UsersService
    ) {
        this.toggleService.isSidebarToggled$.subscribe((isSidebarToggled) => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.getProfile();
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
}
