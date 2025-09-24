// import { inject, PLATFORM_ID } from '@angular/core';
// import { Router } from '@angular/router';
// import { isPlatformBrowser } from '@angular/common';

// export const AuthGuard = () => {
//   const platformId = inject(PLATFORM_ID);
//   const router = inject(Router);

//   let token: string | null = null;

 
//   if (isPlatformBrowser(platformId)) {
//     token = localStorage.getItem('token');
//   }

//   if (!token) {

//     router.navigate(['/authentication']);
//     return false;
//   }

//   return true;
// };


import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
export const AuthGuard = () => {
    const platformId = inject(PLATFORM_ID);
    const router = inject(Router);
    // 🚀 If running on the server, just allow
    if (!isPlatformBrowser(platformId)) {
        return true;
    }
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login...');
        router.navigate(['/authentication']);
        return false;
    }
    return true;
};

