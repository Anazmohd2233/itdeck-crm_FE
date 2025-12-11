import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const AuthGuard = () => {
    const platformId = inject(PLATFORM_ID);
    const router = inject(Router);

    // Skip server-side redirects so SSR doesn't flicker to login
    if (!isPlatformBrowser(platformId)) {
        return true;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        return router.createUrlTree(['/authentication']);
    }

    return true;
};
