import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';
import { routes } from './core/routes/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ADMIN_ROUTES } from './core/routes/admin.routes';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideRouter(ADMIN_ROUTES),
    provideAnimations(),
    provideAnimationsAsync(),
    // provideHttpClient()
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideClientHydration()
  ]
};