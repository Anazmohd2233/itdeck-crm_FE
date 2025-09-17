
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  let token = '';

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token') || '';
  }

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};



