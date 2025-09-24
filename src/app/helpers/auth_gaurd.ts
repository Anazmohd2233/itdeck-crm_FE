import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const AuthGuard = () => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  let token: string | null = null;

 
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
  }

  if (!token) {

    router.navigate(['/authentication']);
    return false;
  }

  return true;
};
