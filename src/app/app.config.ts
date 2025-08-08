import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { jwtInterceptor } from './helpers/jwt.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
      provideRouter(routes), 
      provideClientHydration(), 
      provideAnimationsAsync(),
      provideAnimationsAsync(), 
      provideHttpClient(),
      provideToastr({
        timeOut: 10000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }),
      provideHttpClient(
          withInterceptors([jwtInterceptor])
        )
      ]
  };