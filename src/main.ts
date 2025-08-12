import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));


// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     importProvidersFrom(
//       BrowserAnimationsModule,
//       ToastrModule.forRoot({
//         timeOut: 3000,
//         closeButton: true,
//         progressBar: true,
//         positionClass: 'toast-top-right',
//         preventDuplicates: true
//       })
//     )
//   ]
// };
