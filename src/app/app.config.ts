import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions(), withHashLocation()),
    provideHttpClient(),
    provideToastr({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAnimations(),
    provideZoneChangeDetection(),
  ],
};

const firebaseConfig = {
  apiKey: 'AIzaSyCQUXx-v2scMa_wEAfW7EmGvmDmlco-bFI',
  authDomain: 'angular-ngrx-7c144.firebaseapp.com',
  databaseURL: 'https://angular-ngrx-7c144-default-rtdb.firebaseio.com',
  projectId: 'angular-ngrx-7c144',
  storageBucket: 'angular-ngrx-7c144.firebasestorage.app',
  messagingSenderId: '33743986349',
  appId: '1:33743986349:web:6fa88be551cdd29ca03024',
};
