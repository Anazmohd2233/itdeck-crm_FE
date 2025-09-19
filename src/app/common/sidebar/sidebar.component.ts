import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ToggleService } from './toggle.service';
import { isPlatformBrowser, NgClass, NgIf } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-sidebar',
    imports: [
        NgScrollbarModule,
        MatExpansionModule,
        RouterLinkActive,
        RouterModule,
        RouterLink,
        NgClass,
        NgIf,
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
    // isSidebarToggled
    isSidebarToggled = false;
    user_type: any;
    users: any;

    // isToggled
    isToggled = false;

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        @Inject(PLATFORM_ID) private platformId: Object,
                private authService: AuthService,
                        private usersService: UsersService,
                
        
    ) {
        this.toggleService.isSidebarToggled$.subscribe((isSidebarToggled) => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }
    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.user_type = localStorage.getItem('user_type');
               window.addEventListener('resize', () => {
    if (!this.isMobile() && this.isSidebarToggled) {
      // make sure sidebar stays open on desktop
      this.isSidebarToggled = true;
    }
  });
        }
          this.authService.loginSuccess$.subscribe(() => {
    console.log('🔔🔔🔔🔔🔔🔔 Login detected in sidebar  🔔🔔🔔🔔🔔');
    this.getProfile(); // call your important API
  });

 
    }

    // Burger Menu Toggleg
    toggle() {
        this.toggleService.toggle();
    }

    // Mat Expansion
    panelOpenState = false;


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

    closeSidebarOnMobile() {
  if (this.isMobile()) {
    this.toggleService.toggle(); // ✅ same toggle as burger button
  }
}
  isMobile(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.innerWidth <= 768;
    }
    return false; // default for server-side
  }

}
